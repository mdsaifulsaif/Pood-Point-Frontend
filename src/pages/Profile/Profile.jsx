import React, { useContext, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../ContextApis/ContextProvider";
import { useParams } from "react-router";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";

const Profile = () => {
  const [reels, setReels] = useState([]);
  const [reelsCreator, setReelsCreator] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get(
          `https://reels-app-server-200.onrender.com/api/reel/user-all-reels/${id}`,
          {
            withCredentials: true,
          }
        );
        // setReelsCreator(res.data.creator);
        setReels(res.data.userReels || []);
        console.log(res.data.userReels);
        setReelsCreator(res.data.creator);
        console.log(res.data.creator);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReels();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full md:w-[400px] bg-white min-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">{reelsCreator?.fullName}</h2>
        <FaCog size={22} className="text-gray-700 cursor-pointer" />
      </div>

      {/* Profile Info */}
      <div className="flex items-center p-4">
        {/* <img
          src={user?.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        /> */}
        <div className="w-20 h-20 flex items-center justify-center  rounded-full border">
          <FaUser size={30} />
        </div>
        <div className="flex-1 flex justify-around text-center">
          <div>
            <p className="font-bold">{reels.length}</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div>
            <p className="font-bold">{reelsCreator.followerCount}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="font-bold">{reelsCreator.followingCount}</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4">
        <p className="font-semibold">{reelsCreator.fullName}</p>
        <p className="text-sm">React Developer | Photography Lover 📸</p>
      </div>

      {/* Edit Profile Button */}
      {user.email == reelsCreator.email && (
        <div className="px-4 mt-3">
          <button className="w-full py-2 border rounded-md text-sm font-semibold hover:bg-gray-100">
            Edit Profile
          </button>
        </div>
      )}

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
