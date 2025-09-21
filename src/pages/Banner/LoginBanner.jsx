import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginBanner() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image grid */}
      <div className="hidden md:grid grid-cols-2 gap-2 w-1/2 p-2">
        <img
          src="https://source.unsplash.com/500x600/?shopping"
          alt="shopping"
          className="h-[300px] w-[200px] object-cover rounded-xl"
        />
        <img
          src="https://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
          alt="fashion"
          className="h-[300px] w-[200px] object-cover rounded-xl"
        />
        <img
          src="https://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
          alt="store"
          className="h-[300px] w-[200px] object-cover rounded-xl"
        />
        <img
          src="https://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
          alt="model"
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 m-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-center mb-8">
            <span className="text-pink-500">CorpLife</span>{" "}
            <span className="text-gray-600">Benefits</span>
          </h1>

          {/* Email */}
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button className="w-1/2 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition">
              Login
            </button>
            <button className="w-1/2 py-2 border border-pink-500 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBanner;
