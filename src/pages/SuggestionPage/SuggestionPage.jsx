import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

// API calls
const fetchSuggestions = async () => {
  const res = await axios.get("http://localhost:5000/api/suggestionsusers", {
    withCredentials: true,
  });
  return res.data.users;
};

const followUser = async (targetId) => {
  const res = await axios.post(
    `http://localhost:5000/api/follow/${targetId}`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

const unfollowUser = async (targetId) => {
  const res = await axios.post(
    `http://localhost:5000/api/unfollow/${targetId}`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

const SuggestionPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["suggestions"],
    queryFn: fetchSuggestions,
  });

  const [users, setUsers] = useState([]);

  // initial load
  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  // follow mutation
  const followMutation = useMutation({
    mutationFn: followUser,
  });

  // unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
  });

  const toggleFollow = (user) => {
    if (user.isFollow === "false") {
      // follow
      followMutation.mutate(user._id, {
        onSuccess: () => {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === user._id
                ? { ...u, isFollow: "true", followerCount: u.followerCount + 1 }
                : u
            )
          );
        },
      });
    } else {
      // unfollow
      unfollowMutation.mutate(user._id, {
        onSuccess: () => {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === user._id
                ? {
                    ...u,
                    isFollow: "false",
                    followerCount: u.followerCount - 1,
                  }
                : u
            )
          );
        },
      });
    }
  };

  if (isLoading)
    return <p className="text-center py-4">Loading suggestions...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">People you may know</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-sm">No suggestions available</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => toggleFollow(user)}
                className={`text-sm px-3 py-1 rounded-lg transition
                  ${
                    user.isFollow === "true"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-emerald-700 text-white hover:bg-emerald-800"
                  }
                `}
              >
                {user.isFollow === "true" ? "Unfollow" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link
        className="w-full text-sm text-emerald-700 text-right block mt-3"
        to="/reels/users"
      >
        See All
      </Link>
    </div>
  );
};

export default SuggestionPage;
