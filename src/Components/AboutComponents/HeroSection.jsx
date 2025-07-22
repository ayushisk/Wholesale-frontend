"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full text-white overflow-hidden">
      {/* Background Gradient – soft pastel theme */}
      <div className="bg-gradient-to-b from-[#fbd3e9] via-[#eaeaeb] to-[#d4ecff] py-28 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3e0074] mb-4 leading-tight">
          FMCG Wholesale <br />
          <span className="text-[#5e29a8]">Supplier & Distributor</span>
          <br />
          UK
        </h1>
        <p className="max-w-2xl mx-auto text-[#222] text-lg mt-4">
          Welcome to Rayburn Trading, a leading independent FMCG wholesaler with
          over 65 years of experience in the industry.
        </p>
        <p className="max-w-2xl mx-auto text-[#222] text-lg mt-4">
          We pride ourselves on our extensive range, stocking over 4,500
          products across various categories, from food and drink to beauty and
          household essentials.
        </p>
        <p className="max-w-2xl mx-auto text-[#222] text-lg mt-4">
          With our robust supply network, we distribute our products to more
          than 70 countries worldwide, ensuring retailers globally can access
          high-quality goods reliably.
        </p>
        <p className="max-w-2xl mx-auto text-[#222] text-lg mt-4">
          Our dedication to excellence and customer satisfaction makes us a
          preferred partner for businesses seeking dependable and comprehensive
          wholesale solutions.
        </p>
      </div>

      {/* Bottom Waves – light blue tone */}
      <div className="absolute bottom-0  left-0 w-full">
        <svg viewBox="0 0 1440 320" className="w-full  h-60">
          <path
            fill="#b4dcf6"
            fillOpacity="1"
            d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
