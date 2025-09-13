import { Outlet, Link } from "react-router";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed top-0 left-0 h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Partner Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-emerald-600"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link
            to="/dashboard/orders"
            className="flex items-center gap-2 hover:text-emerald-600"
          >
            <FaBoxOpen /> Orders
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 hover:text-emerald-600"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 hover:text-emerald-600"
          >
            <FaCog /> Settings
          </Link>
        </nav>
        <button className="flex items-center gap-2 p-4 text-red-600 hover:bg-gray-50">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
