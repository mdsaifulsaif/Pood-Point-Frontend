import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeedShowcase from "../components/FeedShowcase";

function MainLayout() {
  return (
    <div className=" h-screen">
      {/* <div className="md:col-span-6 md:block hidden ">
        <FeedShowcase />
      </div> */}
      <div className="">
        {" "}
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
