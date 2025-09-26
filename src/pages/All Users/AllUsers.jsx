// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AllUsers({ currentUserId }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         // res.data.users এর উপর map
//         const usersWithState = res.data.users.map((u) => ({
//           ...u,
//           isFollowing: false, // default state
//         }));
//         setUsers(usersWithState);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//       });
//   }, []);

//   const toggleFollow = async (targetId, isFollowing) => {
//     try {
//       if (!isFollowing) {
//         // Follow
//         await axios.post(
//           `http://localhost:5000/api/follow/${targetId}`,
//           {
//             userId: currentUserId,
//           },
//           {
//             withCredentials: true,
//           }
//         );

//         setUsers((prev) =>
//           prev.map((u) =>
//             u._id === targetId
//               ? { ...u, followerCount: u.followerCount + 1, isFollowing: true }
//               : u
//           )
//         );
//       } else {
//         // Unfollow
//         await axios.post(
//           `http://localhost:5000/api/unfollow/${targetId}`,
//           {
//             userId: currentUserId,
//           },
//           {
//             withCredentials: true,
//           }
//         );

//         setUsers((prev) =>
//           prev.map((u) =>
//             u._id === targetId
//               ? { ...u, followerCount: u.followerCount - 1, isFollowing: false }
//               : u
//           )
//         );
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div>
//       {users.map((user) => (
//         <div
//           key={user._id}
//           style={{
//             marginBottom: "15px",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <strong>{user.fullName}</strong> ({user.followerCount} followers)
//           </div>
//           {user._id !== currentUserId && (
//             <button
//               onClick={() => toggleFollow(user._id, user.isFollowing)}
//               style={{
//                 padding: "5px 15px",
//                 backgroundColor: user.isFollowing ? "#f44336" : "#4CAF50",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               {user.isFollowing ? "Unfollow" : "Follow"}
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AllUsers({ currentUserId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      return res.data.users;
    },
  });

  const [users, setUsers] = useState([]);

  // query data থেকে সরাসরি state সেট
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const toggleFollow = async (targetId, isFollow) => {
    try {
      if (isFollow === "false") {
        // follow request
        await axios.post(
          `http://localhost:5000/api/follow/${targetId}`,
          { userId: currentUserId },
          { withCredentials: true }
        );

        setUsers((prev) =>
          prev.map((u) =>
            u._id === targetId
              ? {
                  ...u,
                  followerCount: u.followerCount + 1,
                  isFollow: "true", // DB ফিল্ড reflect করানো হলো
                }
              : u
          )
        );
      } else {
        // unfollow request
        await axios.post(
          `http://localhost:5000/api/unfollow/${targetId}`,
          { userId: currentUserId },
          { withCredentials: true }
        );

        setUsers((prev) =>
          prev.map((u) =>
            u._id === targetId
              ? {
                  ...u,
                  followerCount: u.followerCount - 1,
                  isFollow: "false",
                }
              : u
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 w-full py-5 md:w-[400px]">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between  items-center p-4 border rounded-lg"
        >
          <div>
            <strong>{user.fullName}</strong>{" "}
            <span className="text-gray-500 text-sm">
              ({user.followerCount} followers)
            </span>
          </div>
          {user._id !== currentUserId && (
            <button
              onClick={() => toggleFollow(user._id, user.isFollow)}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition 
                ${
                  user.isFollow === "true"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }
              `}
            >
              {user.isFollow === "true" ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
