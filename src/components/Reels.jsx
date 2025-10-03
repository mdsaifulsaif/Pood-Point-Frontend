import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";

// custom hook to fetch comments for a reel
function useComments(reelId) {
  return useQuery({
    queryKey: ["comments", reelId],
    queryFn: async () => {
      const res = await axios.get(
        `https://reels-app-server-200.onrender.com/api/comment/${reelId}`,
        { withCredentials: true }
      );
      return Array.isArray(res.data) ? res.data : res.data.comments || [];
    },
    enabled: !!reelId,
  });
}

function Reels() {
  const videoRefs = useRef([]);
  const queryClient = useQueryClient();
  const [openComments, setOpenComments] = useState(null);

  // fetch reels
  const { data, isLoading } = useQuery({
    queryKey: ["reels"],
    queryFn: async () => {
      const res = await axios.get(
        "https://reels-app-server-200.onrender.com/api/reel",
        {
          withCredentials: true,
        }
      );

      return res.data.reelItems || [];
    },
  });

  // like mutation
  const likeMutation = useMutation({
    mutationFn: async (reelId) => {
      const res = await axios.post(
        "https://reels-app-server-200.onrender.com/api/reel/like",
        { reelId },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reels"]);
    },
  });

  // comment mutation
  const commentMutation = useMutation({
    mutationFn: async ({ reelId, text }) => {
      const res = await axios.post(
        `https://reels-app-server-200.onrender.com/api/comment`,
        { reelId, comment: text },
        { withCredentials: true }
      );
      toast.success("Comment added successfully");
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["comments", variables.reelId]);
    },
  });

  useEffect(() => {
    if (!data || !data.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [data]);

  if (isLoading) return <LoadingPage />;
  if (!data?.length) return <p className="text-center mt-10">No videos</p>;

  return (
    <div className="flex flex-col gap-6">
      {data.map((reel, index) => (
        <article
          key={reel._id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <header className="flex items-center gap-3 p-4">
            <Link to={`/reels/profile/${reel.createBy}`}>
              <div className="w-10 flex items-center justify-center h-10 rounded-full bg-gray-200">
                <FaUser size={20} />
              </div>
            </Link>
            <div>
              {/* <div className="font-semibold">
                {reel.name?.length > 20
                  ? reel.name.slice(0, 20) + "..."
                  : reel.name}
              </div> */}
              <div className="text-xs text-gray-400">Dhaka, Bangladesh</div>
            </div>
            <button className="ml-auto text-sm">•••</button>
          </header>

          {/* Video */}
          <div className="w-full md:w-[400px] aspect-[5/7] bg-black">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.video}
              className="w-full h-full object-cover block"
              loop
              muted
              playsInline
            />
          </div>

          {/* Actions + Likes */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                {/* Like button */}
                <button
                  onClick={() => likeMutation.mutate(reel._id)}
                  className="text-xl"
                >
                  {reel.isLike ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                {/* Comment toggle */}
                <button
                  onClick={() =>
                    setOpenComments(openComments === reel._id ? null : reel._id)
                  }
                  className="text-xl"
                >
                  <FaRegComment />
                </button>

                <Link to={`/reels/${reel._id}`}>
                  <button className="text-lg cursor-pointer text-emerald-700 ">
                    ↗See Comments
                  </button>
                </Link>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {reel.likeCount} likes
              </div>
            </div>

            {/* Caption */}
            <p className="mt-3 text-sm">
              <span className="font-semibold mr-2">
                {reel.name?.length > 20
                  ? reel.name.slice(0, 40) + "..."
                  : reel.name}
              </span>
              {reel.description?.length > 30
                ? reel.description.slice(0, 40) + "..."
                : reel.description}
            </p>

            {/* Inline comment section */}
            {openComments === reel._id && (
              <div className="mt-4 space-y-3">
                <ReelComments
                  reelId={reel._id}
                  commentMutation={commentMutation}
                />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

// ReelComments component
function ReelComments({ reelId, commentMutation }) {
  const { data: comments = [], isLoading } = useComments(reelId);

  const latestComment = comments.length ? [comments[0]] : [];

  if (isLoading) return <LoadingPage />;

  return (
    <>
      {latestComment.length > 0 && (
        <div className="text-sm pb-1">
          <span className="font-semibold">
            {latestComment[0].user?.fullName}:
          </span>{" "}
          <span>{latestComment[0].comment}</span>
        </div>
      )}

      {/* Add comment */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.comment.value;
          if (!text.trim()) return;
          commentMutation.mutate({ reelId, text });
          e.target.reset();
        }}
        className="flex gap-2 mt-2"
      >
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="flex-1 border border-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="bg-emerald-700 text-white px-3 rounded-full text-sm"
        >
          Comment
        </button>
      </form>
    </>
  );
}

export default Reels;
