import React from "react";
import AboutBanner from "@/Components/AboutComponents/AboutBanner";
import HeroSection from "@/Components/AboutComponents/HeroSection";
import BestSellers from "@/Components/AboutComponents/BestSellers";
import FavFmcg from "@/Components/AboutComponents/FavFmcg";
import FmcgPage from "@/Components/AboutComponents/FmcgPage";

const page = () => {
  return (
    <div>
      <AboutBanner />
      <HeroSection />
      <BestSellers />
      <FavFmcg/>
      <FmcgPage/>
    </div>
  );
};

export default page;
