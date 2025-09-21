import React, { use } from "react";
import { FaHome, FaSearch, FaShoppingBag } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";
import axios from "axios";

const MobileNavbar = () => {
  const { user, setUser } = use(AuthContext);

  // logout
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data) {
        setUser(null); //
        toast.success("Logout successful");
        // navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="fixed bottom-0 py-4 left-0 right-0 bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-2">
        <Link
          to="/reels"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaHome size={24} />
        </Link>
        {/* <button className="flex flex-col items-center text-gray-700 hover:text-black">
          <FaSearch size={24} />
        </button> */}
        <Link
          to="/reels/create-reel"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <MdVideoLibrary size={24} />
        </Link>

        {/* <button className="flex flex-col items-center text-gray-700 hover:text-black">
          <FaShoppingBag size={24} />
        </button> */}
        <Link
          to={`/reels/profile/${user._id}`}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <FaRegUserCircle size={24} />
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <MdExitToApp size={25} />
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
