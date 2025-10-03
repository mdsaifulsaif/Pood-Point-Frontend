import React from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Comments() {
  const { reelId } = useParams();
  const queryClient = useQueryClient();

  // fetch comments
  const { data: comments = [], isLoading } = useQuery({
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

  // add comment
  const commentMutation = useMutation({
    mutationFn: async ({ reelId, comment }) => {
      const res = await axios.post(
        `https://reels-app-server-200.onrender.com/api/comment`,
        { reelId, comment },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", reelId]);
    },
  });

  return (
    <div className="max-w-md mx-auto p-4">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/reels" className="text-emerald-700 text-sm hover:underline">
          ← Back
        </Link>
        <h2 className="font-semibold text-gray-800">Comments</h2>
      </div>

      {/* add comment form on top */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.comment.value;
          if (!text.trim()) return;
          commentMutation.mutate({ reelId, comment: text });
          e.target.reset();
        }}
        className="flex items-center gap-2 mb-4 border-b pb-3"
      >
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded-2xl font-semibold text-sm hover:opacity-80"
        >
          Comment
        </button>
      </form>

      {/* comments list */}
      {isLoading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : comments.length ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="flex items-start gap-2">
              {/* avatar */}
              {c.user?.avatar ? (
                <img
                  src={c.user.avatar}
                  alt={c.user.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-400" />
              )}

              {/* comment text */}
              <div>
                <p className="text-sm">
                  <span className="font-semibold mr-1">
                    {c.user?.fullName || "Anonymous"}
                  </span>
                  <p className="text-sm pt-1">{c.comment}</p>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No comments yet</p>
      )}
    </div>
  );
}

export default Comments;
