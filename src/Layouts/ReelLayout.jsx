import React, { use } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { FaUser, FaUsers } from "react-icons/fa";
import MobileNavbar from "../components/MobileNavbar";
import { AuthContext } from "../ContextApis/ContextProvider";
import Logout from "../components/Logout";
import logo from "../assets/photos/logola.jpeg";
import SuggestionPage from "../pages/SuggestionPage/SuggestionPage";

export default function ReelLayout() {
  const { user } = use(AuthContext);
  return (
    <div className="relative md:max-w-6xl z-10 mx-auto ">
      {/* Left sidebar */}
      <aside className="hidden md:block fixed  h-screen left-1/2 -translate-x-[36rem] w-90  border-r bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* <h2 className="font-semibold text-gray-700">Left Sidebar</h2> */}
          {/* <ul className="space-y-2 text-sm">
            <li>Profile</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul> */}
          <div className="space-y-4">
            <Link to={"/reels"}>
              <div>
                <img className="h-[100px]" src={logo} alt="" />
              </div>
            </Link>
            <Link to={`/reels/profile/${user._id}`}>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser size={20} />
                </div>

                <div>
                  <div className="font-semibold">{user.fullName}</div>
                  <div className="text-sm text-gray-500">View profile</div>
                </div>
              </div>
            </Link>
            <div className="p-4 rounded-xl  bg-white shadow-sm flex flex-col gap-3">
              <Link
                to="/reels"
                className="px-4 text-center py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/reels/users"
                className="px-4 text-center py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Followers
              </Link>
              <Link
                to="/reels/create-reel"
                className="px-4 text-center py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Create Reels
              </Link>
              <Link
                to="/reels/create-post"
                className="px-4 text-center py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Create Post
              </Link>
            </div>

            {/* <div className="p-4 md:hidden rounded-xl bg-white shadow-sm">
              <h4 className="text-sm font-medium text-gray-700">Create</h4>
              <p className="text-xs text-gray-500 mt-2">
                Quick actions for new posts or reels.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to={`/reels/create-post`}
                  className="px-3 py-2 rounded-lg border"
                >
                  Create Post
                </Link>
                <Link
                  to="/reels/create-reel"
                  className="px-3 py-2 rounded-lg text-red-600 border"
                >
                  Create Reel
                </Link>
              </div>
            </div> */}

            <div className="p-4 rounded-xl  bg-white shadow-sm flex items-center justify-center flex-col gap-3">
              <Logout />
            </div>

            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Clipzy • About • Help • Press
            </div>
          </div>
        </div>
      </aside>

      {/* Main feed */}
      <main className="min-h-screen z-20 px-4 ">
        <div className="flex flex-col items-center gap-6 ">
          {/* <Outlet /> */}
          <Outlet />
          {/* <div className="text-gray-500 text-sm py-6">End of feed</div> */}
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="hidden md:block fixed h-screen top-0 right-1/2 translate-x-[36rem] w-90 h-[calc(100vh-55px)] border-l bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* <h2 className="font-semibold text-gray-700">Right Sidebar</h2> */}
          {/* <ul className="space-y-2 text-sm">
            <li>Trends</li>
            <li>Suggestions</li>
            <li>Links</li>
          </ul> */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white shadow-sm">
              <h4 className="text-sm font-medium text-gray-700">Create</h4>
              <p className="text-xs text-gray-500 mt-2">
                Quick actions for new posts or reels.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to="/reels/create-post"
                  className="px-3 py-2 rounded-lg border"
                >
                  Create Post
                </Link>
                <Link
                  to="/reels/create-reel"
                  className="px-3 py-2 rounded-lg border"
                >
                  Create Reel
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm">
              <SuggestionPage />
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm">
              <h4 className="text-sm font-medium text-gray-700">Trends</h4>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>#dhaka</li>
                <li>#streetphotography</li>
                <li>#food</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
