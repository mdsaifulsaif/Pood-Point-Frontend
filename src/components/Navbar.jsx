import { Link } from "react-router";
import {
  FaHome,
  FaVideo,
  FaShoppingBag,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import PartnerButton from "./PartnerButton";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/4fF6nZV/instagram.png"
            alt="logo"
            className="w-7 h-7"
          />
          <span className="font-bold text-lg">ReelApp</span>
        </Link>

        {/* Nav Items */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/reels"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaVideo /> Reels
          </Link>
          <Link
            to="/shop"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaShoppingBag /> Shop
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaSignInAlt /> Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaUserPlus /> Register
          </Link>
          <PartnerButton />
        </nav>
      </div>
    </header>
  );
}
