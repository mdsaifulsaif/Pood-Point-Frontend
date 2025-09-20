import React, { use } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import Reels from "../components/Reels";
import MobileNavbar from "../components/MobileNavbar";
import { AuthContext } from "../ContextApis/ContextProvider";
import Logout from "../components/Logout";

export default function ReelLayout() {
  const { user } = use(AuthContext);
  console.log(user);
  return (
    <div className="relative md:max-w-6xl z-10 mx-auto ">
      {/* Left sidebar */}
      <aside className="hidden md:block fixed  h-screen left-1/2 -translate-x-[36rem] w-90 h-[calc(100vh-55px)] border-r bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-700">Left Sidebar</h2>
          {/* <ul className="space-y-2 text-sm">
            <li>Profile</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul> */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                S
              </div>
              <div>
                <div className="font-semibold">Md. Saiful</div>
                <div className="text-sm text-gray-500">View profile</div>
              </div>
            </div>

            <div className="p-4 rounded-xl  bg-white shadow-sm flex flex-col gap-3">
              <Link
                to="/reels"
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to={`/reels/profile/${user._id}`}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Profile
              </Link>
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                Reels
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                Post
              </button>
            </div>

            <div className="p-4 md:hidden rounded-xl bg-white shadow-sm">
              <h4 className="text-sm font-medium text-gray-700">Create</h4>
              <p className="text-xs text-gray-500 mt-2">
                Quick actions for new posts or reels.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to={`/reels/create-reel/`}
                  className="px-3 py-2 rounded-lg border"
                >
                  Post
                </Link>
                <Link
                  to="/reels/create-reel"
                  className="px-3 py-2 rounded-lg text-red-600 border"
                >
                  Reel
                </Link>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Suggestions for you
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div>
                      <div className="text-sm font-medium">rana_dev</div>
                      <div className="text-xs text-gray-400">
                        New to Instagram
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600">Follow</button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div>
                      <div className="text-sm font-medium">mim_photo</div>
                      <div className="text-xs text-gray-400">Suggested</div>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600">Follow</button>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl  bg-white shadow-sm flex items-center justify-center flex-col gap-3">
              <Logout />
            </div>

            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} YourApp • About • Help • Press
            </div>
          </div>
        </div>
      </aside>

      {/* Main feed */}
      <main className="min-h-screen z-20 px-4 ">
        <div className="flex flex-col items-center gap-6 ">
          {/* <Outlet /> */}
          <Outlet />
          <div className="text-gray-500 text-sm py-6">End of feed</div>
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="hidden md:block fixed h-screen top-0 right-1/2 translate-x-[36rem] w-90 h-[calc(100vh-55px)] border-l bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-700">Right Sidebar</h2>
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
                <Link to="" className="px-3 py-2 rounded-lg border">
                  Post
                </Link>
                <Link
                  to="/reels/create-reel"
                  className="px-3 py-2 rounded-lg border"
                >
                  Reel
                </Link>
              </div>
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
