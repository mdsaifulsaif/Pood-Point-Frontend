import React from "react";

function Navber() {
  return (
    <div>
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-sm text-gray-600">/ Sales@reelers.io</div>
        <nav className="flex items-center space-x-6 text-gray-700 text-sm">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Pricing</a>
          <a href="#">Developers</a>
          <a href="#">Log in</a>
          <button className="bg-black text-white px-4 py-2 rounded-full">
            Get it Now — It’s Free
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Navber;
