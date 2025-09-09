import { Outlet } from "react-router";
import {
  FaHome,
  FaCompass,
  FaVideo,
  FaShoppingBag,
  FaBookmark,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Logout from "../components/Logout";
import { use } from "react";
import { AuthContext } from "../ContextApis/ContextProvider";

export default function ReelLayout() {
  const { user } = use(AuthContext);
  console.log("current user from layout", user);
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-gray-500 min-h-screen flex">
        {/* Left Sidebar - Fixed */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-80 border-r bg-white p-4">
          <div className="flex items-center gap-2 mb-8">
            <img
              src="https://i.ibb.co/4fF6nZV/instagram.png"
              alt="logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold">ReelApp</h1>
          </div>

          <nav className="flex flex-col gap-4 flex-1">
            <a
              href="/"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaHome /> News Feed
            </a>
            <a
              href="/explore"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaCompass /> Explore
            </a>
            <a
              href="/reels"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaVideo /> Reels
            </a>
            <a
              href="/shop"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaShoppingBag /> Shop
            </a>
            <a
              href="/saved"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaBookmark /> Saved
            </a>
            <a
              href="/insights"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaChartBar /> Insights
            </a>
            <a
              href="/settings"
              className="flex items-center gap-3 hover:text-emerald-600"
            >
              <FaCog /> Settings
            </a>
          </nav>

          <button className="flex items-center gap-3 text-red-600 mt-6">
            <FaSignOutAlt /> Logout
          </button>
          <Logout />
        </aside>

        {/* Middle Content */}
        <main className="flex-1 px-4 py-6 lg:ml-64 xl:mr-80">
          <div className="max-w-2xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar - Fixed */}
        <aside className="hidden xl:flex flex-col fixed right-0 top-0 h-full w-80 border-l bg-white p-4">
          <h2 className="text-lg font-bold mb-4">Insights</h2>
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-6">
            📊 Chart Placeholder
          </div>
          <h2 className="text-lg font-bold mb-4">Suggestions For You</h2>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="sug"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>User{i + 1}</span>
                </div>
                <button className="text-blue-500 text-sm">Follow</button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
