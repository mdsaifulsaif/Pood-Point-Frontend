import React from "react";
import { FaStar } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

function Banner() {
  return (
    <section className="bg-pink-100 h-screen py-12">
      <div className="grid  md:grid-cols-2 items-center max-w-6xl mx-auto gap-8 px-6 md:px-16">
        {/* Left Section */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-700">20M+ Users</h2>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-black">
            Food Pont
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            Engage viewers, boost sales, and leverage user-generated content —
            all 30X faster than YouTube.
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
            <span>📈</span>
            <span>
              Earn more up to <b>200%</b> /{" "}
              <FaStar className="inline text-yellow-500" /> 4.9 Viewership
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Download — It’s Free
            </button>
            <button className="flex items-center gap-2 bg-white border px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Our Pricing <HiArrowUpRight />
            </button>
          </div>
        </div>

        {/* Right Section (Reel Image) */}
        <div className="flex justify-center">
          <div className="relative w-[70%] sm:w-64 md:w-80 lg:w-60 aspect-[9/16] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://i.ibb.co/YT1wNN5g/Untitled-design-58.png"
              alt="Reel"
              className="w-full h-full object-cover"
            />

            {/* Optional Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white bg-opacity-70 hover:bg-opacity-90 text-black p-4 rounded-full shadow-lg transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.29v7.42a1 1 0 001.234.97l6.518-3.758a1 1 0 000-1.72z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
