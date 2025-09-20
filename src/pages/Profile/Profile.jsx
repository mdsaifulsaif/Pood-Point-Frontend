// import React, { use, useEffect, useState } from "react";
// import { FaCog } from "react-icons/fa";
// import { AuthContext } from "../../ContextApis/ContextProvider";
// import { useParams } from "react-router";
// import axios from "axios";

// const Profile = () => {
//   const [reels, setReels] = useState([]);
//   const { user } = use(AuthContext);
//   const { id } = useParams();
//   console.log(id);

//   useEffect(() => {
//     const fetchReels = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/reel/user-all-reels/${id}`,
//           {
//             withCredentials: true,
//           }
//         );
//         // setReels(res.data.reelItems);
//         console.log(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setLoading(false);
//       }
//     };
//     fetchReels();
//   }, []);

//   return (
//     <div className=" mx-auto w-full md:w-[400px] bg-white min-h-[90vh]">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="text-xl font-bold">{user.fullName}</h2>
//         <FaCog size={22} className="text-gray-700 cursor-pointer" />
//       </div>

//       {/* Profile Info */}
//       <div className="flex items-center p-4">
//         <img
//           src="https://via.placeholder.com/100"
//           alt="Profile"
//           className="w-20 h-20 rounded-full border"
//         />
//         <div className="flex-1 flex justify-around text-center">
//           <div>
//             <p className="font-bold">12</p>
//             <p className="text-sm text-gray-600">Posts</p>
//           </div>
//           <div>
//             <p className="font-bold">120</p>
//             <p className="text-sm text-gray-600">Followers</p>
//           </div>
//           <div>
//             <p className="font-bold">180</p>
//             <p className="text-sm text-gray-600">Following</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio */}
//       <div className="px-4">
//         <p className="font-semibold">{user.fullName}</p>
//         <p className="text-sm">React Developer | Photography Lover 📸</p>
//       </div>

//       {/* Edit Profile Button */}
//       <div className="px-4 mt-3">
//         <button className="w-full py-2 border rounded-md text-sm font-semibold hover:bg-gray-100">
//           Edit Profile
//         </button>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-3 gap-1 mt-4">
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//         <img
//           src="https://via.placeholder.com/200"
//           alt="post"
//           className="w-full h-32 object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { AuthContext } from "../../ContextApis/ContextProvider";
import { useParams } from "react-router";
import axios from "axios";

const Profile = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reel/user-all-reels/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("User Reels:", res.data);
        setReels(res.data.userReels || []);
      } catch (err) {
        console.error("Error fetching reels:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReels();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full md:w-[400px] bg-white min-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">{user?.fullName}</h2>
        <FaCog size={22} className="text-gray-700 cursor-pointer" />
      </div>

      {/* Profile Info */}
      <div className="flex items-center p-4">
        <img
          src={user?.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div className="flex-1 flex justify-around text-center">
          <div>
            <p className="font-bold">{reels.length}</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div>
            <p className="font-bold">120</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="font-bold">180</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4">
        <p className="font-semibold">{user?.fullName}</p>
        <p className="text-sm">React Developer | Photography Lover 📸</p>
      </div>

      {/* Edit Profile Button */}
      <div className="px-4 mt-3">
        <button className="w-full py-2 border rounded-md text-sm font-semibold hover:bg-gray-100">
          Edit Profile
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {reels.length > 0 ? (
          reels.map((reel) => (
            <video
              key={reel._id}
              src={reel.video}
              className="w-full h-40 object-cover"
              controls
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 py-4">
            No posts yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
