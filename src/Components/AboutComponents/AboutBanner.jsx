"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

/* ------------ Dummy promotional banners (for new slider) ------------ */
const promoBanners = [
  "/images/about/wholesale3.png",
  "/images/about/wholesale4.png",
  "/images/about/wholesale5.png",
  "/images/about/wholesale6.png",
  "/images/about/wholesale7.png",
];

export default function AboutBanner() {
  /* ---------- NEW compact banner settings ---------- */
  const bannerSettings = {
    dots: true,           // show dots
    infinite: true,
    speed: 600,           // slide transition duration (ms)
    slidesToShow: 1,      // show one at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,  // change every 3 s
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="relative w-full text-[#2b2b2b] bg-gradient-to-br from-[#fbd3e9] via-[#c6c2ff] to-[#d4ecff] py-16">
      {/* ======= Top grid: headline + hero packshot ======= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">
        {/* Left copy */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 text-[#3e0074]">
            The UK&apos;s #1 <br />
            <span className="underline decoration-yellow-400 underline-offset-4">
              Independent Wholesaler
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#3a3a3a]/90 max-w-md">
            The leading household, toiletries, drinks &amp; confectionery
            wholesaler to the UK and over 40 countries worldwide.
          </p>

          <button className="mt-6 inline-block w-fit bg-white text-pink-500 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-300 hover:text-pink-800 transition">
            Become A Customer
          </button>
        </div>

        {/* Right image */}
        <div className="flex justify-center items-start">
          <Image
            src="/images/about/wholesale4.png"
            alt="Featured confectionery multipack"
            width={500}
            height={500}
            priority
            className="rounded-md shadow-xl object-contain"
          />
        </div>
      </div>

      {/* ======= Bottom slider (updated) ======= */}
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <Slider {...bannerSettings}>
          {promoBanners.map((src, index) => (
            <div key={index}>
              <div className="rounded-xl overflow-hidden shadow-lg bg-white p-4 h-[300px] flex items-center justify-center">
                <Image
                  src={src}
                  alt={`Promo ${index + 1}`}
                  width={500}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
