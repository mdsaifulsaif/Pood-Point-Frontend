import { FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative pt-[55px] bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Trustpilot */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex text-green-600 text-lg">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <span className="text-gray-600">4.7 on TrustPilot</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Boost your conversions instantly
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-6">
            Packed with lightning-fast Shoppable videos, interactive video
            quizzes, live-stream shopping & more — All 3x faster than YouTube.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition">
              Get Started — For Free
            </button>
            <button className="px-6 py-3 rounded-full border border-gray-400 font-medium hover:bg-gray-100 transition">
              Book A Demo
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative flex justify-center">
          {/* Main Hero Image */}
          <div className="w-[260px] h-[460px] rounded-3xl overflow-hidden shadow-lg relative">
            <img
              src="https://via.placeholder.com/260x460.png"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating card - Add to Cart */}
          <div className="absolute top-6 -left-16 bg-white rounded-2xl shadow-lg px-4 py-3 w-36">
            <img
              src="https://via.placeholder.com/100"
              alt="Hot Sale"
              className="rounded-lg mb-2"
            />
            <button className="text-sm w-full py-1 bg-black text-white rounded-lg hover:bg-gray-900">
              Add to cart
            </button>
          </div>

          {/* Floating card - Product details */}
          <div className="absolute bottom-6 -left-20 bg-white rounded-2xl shadow-lg px-4 py-3 w-40">
            <p className="text-xs text-gray-600">SANDIE Backless Maxi Dress</p>
            <p className="text-sm font-semibold">$48.99</p>
            <button className="text-xs text-black flex items-center gap-1 mt-1 hover:text-gray-600">
              Shop Now <FiArrowRight />
            </button>
          </div>

          {/* Floating Stat */}
          <div className="absolute top-10 -right-16 bg-green-100 text-green-800 rounded-xl px-4 py-3 shadow">
            <p className="text-xl font-bold">20X</p>
            <p className="text-xs">Jump in sales</p>
          </div>
        </div>
      </div>
    </section>
  );
}
