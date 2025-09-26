import React from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function Comments() {
  const { reelId } = useParams();
  const queryClient = useQueryClient();

  // fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", reelId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/comment/${reelId}`,
        { withCredentials: true }
      );
      // backend যদি সরাসরি array return করে
      return Array.isArray(res.data) ? res.data : res.data.comments || [];
    },
    enabled: !!reelId, // reelId না থাকলে কল হবে না
  });

  // add comment
  const commentMutation = useMutation({
    mutationFn: async ({ reelId, comment }) => {
      const res = await axios.post(
        `http://localhost:5000/api/comment`,
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
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="text-blue-500 text-sm">
          ← Back
        </Link>
        <h2 className="font-semibold">All Comments</h2>
      </div>

      {isLoading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : comments.length ? (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c._id} className="border-b pb-2">
              <p className="text-sm">
                <span className="font-semibold">{c.user?.fullName}</span>:{" "}
                {c.comment}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No comments yet</p>
      )}

      {/* add comment */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.comment.value;
          if (!text.trim()) return;
          commentMutation.mutate({ reelId, comment: text });
          e.target.reset();
        }}
        className="flex gap-2 mt-4"
      >
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="flex-1 border border-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 rounded-full text-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Comments;
