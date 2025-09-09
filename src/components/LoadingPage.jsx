import { FaHamburger, FaPizzaSlice, FaIceCream } from "react-icons/fa";

function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {/* Animated Icons */}
      <div className="flex space-x-6 mb-6">
        <FaHamburger className="text-6xl text-orange-600 drop-shadow-lg animate-spin-slow" />
        <FaPizzaSlice className="text-6xl text-red-500 drop-shadow-lg animate-bounce" />
        <FaIceCream className="text-6xl text-pink-500 drop-shadow-lg animate-spin" />
      </div>

      {/* Loading Text */}
      <h1 className="text-2xl font-bold text-gray-800 animate-pulse">
        Loading your delicious experience... 🍽️
      </h1>
    </div>
  );
}

export default LoadingPage;
