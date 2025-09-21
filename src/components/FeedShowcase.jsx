import React from "react";
import { AiFillHeart, AiFillFire } from "react-icons/ai"; // Example icons
import { BiSolidCheckCircle } from "react-icons/bi";
// ... import other icons as needed

const FeedShowcase = () => {
  return (
    <div className="relative w-full h-auto py-12 flex justify-center items-center overflow-hidden">
      {/* Container for the stacked cards */}
      <div className="relative w-96 h-[600px] flex justify-center items-center">
        {/* Card 1: Back, Left */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform rotate-[-15deg] z-10 sm:w-80 sm:h-[500px]">
          <img
            src="phttps://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
            alt="Person"
            className="w-full h-full object-cover"
          />
          {/* Heart and Fire icon overlays */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <span className="text-4xl text-red-500 animate-pulse">
              <AiFillHeart />
            </span>
            <span className="text-4xl text-orange-500 animate-bounce">
              <AiFillFire />
            </span>
          </div>
        </div>

        {/* Card 2: Main, Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-[-2deg] z-20 sm:w-96 sm:h-[600px]">
          <img
            src="https://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
            alt="Two people"
            className="w-full h-full object-cover"
          />
          {/* Search bar and like button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] flex items-center gap-2 p-2 bg-gray-200 bg-opacity-70 rounded-full">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none border-none text-gray-800 placeholder-gray-500 pl-4"
            />
            <span className="text-4xl text-gray-500 cursor-pointer">
              <AiFillHeart />
            </span>
          </div>
        </div>

        {/* Card 3: Back, Right */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform rotate-[10deg] z-10 sm:w-80 sm:h-[500px]">
          <img
            src="https://cdn.pixabay.com/photo/2025/09/04/11/25/kokoshnik-9815386_1280.jpg"
            alt="Man with earphones"
            className="w-full h-full object-cover"
          />
          {/* Checkmark icon */}
          <div className="absolute top-8 right-8 text-4xl text-green-500">
            <BiSolidCheckCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedShowcase;
