import React from "react";
import { Link, Outlet } from "react-router";
import Reels from "../components/Reels";

// Instagram-like web feed component
// TailwindCSS required in the project
// Usage: import InstagramFeed from './InstagramFeed';

export default function ReelLayout() {
  return (
    <div className="w-full md:max-w-6xl md:mx-auto relative">
      {/* Grid: left sidebar | center feed | right sidebar */}
      <div className="flex gap-6">
        {/* Left sidebar (fixed) */}
        <aside className="hidden md:block mt-[55px] w-60 fixed left-20 top-0 h-screen overflow-y-auto border-r bg-gray-50 px-4 py-6">
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

            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} YourApp • About • Help • Press
            </div>
          </div>
        </aside>

        {/* Center feed (reels) */}
        <main className="flex-1 mt-[55px] min-h-screen md:mx-64 md:mr-72 px-4">
          <div className="flex flex-col items-center justify-center gap-6 py-6">
            {/* <Outlet /> */}
            <Reels />

            <div className="text-center text-sm text-gray-500 py-6">
              End of feed
            </div>
          </div>
        </main>

        {/* Right sidebar (fixed) */}
        <aside className="hidden md:block mt-[55px] w-72 fixed right-20 top-0 h-screen overflow-y-auto border-l bg-gray-50 px-4 py-6">
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
                  to="/dashboard/addfooditem"
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
        </aside>
      </div>
    </div>
  );
}
