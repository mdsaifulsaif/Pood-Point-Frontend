import React, { use } from "react";
import { FaHome, FaSearch, FaShoppingBag } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";

const MobileNavbar = () => {
  const { user } = use(AuthContext);
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
      </div>
    </div>
  );
};

export default MobileNavbar;
