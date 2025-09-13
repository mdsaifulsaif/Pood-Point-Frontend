import React from "react";
import Banner from "../../components/Banner";
import StatsSection from "../../components/StatsSection";
import PartnersMarquee from "../../components/PartnersMarquee";
import Reels from "../../components/Reels";

function Home() {
  return (
    <div>
      <Banner />
      <PartnersMarquee />
      <StatsSection />
      <Reels />
    </div>
  );
}

export default Home;
