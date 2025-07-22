"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Sample banner data
const banners = [
  {
    leftText: {
      heading: "Epic Prices Great Discounts",
      subheading: "50-80% OFF",
      buttonText: "Shop Now",
    },
    mainImage: "/wholesale2.png", // 👈 Place this image in /public
    rightTag: {
      text: "MEGA SAVINGS SALE",
      date: "JULY 11 – 17",
    },
  },
  {
    leftText: {
      heading: "Flat ₹300 OFF",
      subheading: "On First Purchase",
      buttonText: "Download App",
    },
    mainImage: "/wholesale2.png",
    rightTag: {
      text: "LIMITED OFFER",
      date: "Only On App",
    },
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const total = banners.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goToSlide = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <div className="w-full py-4 px-4 md:px-10">
      <div className="relative overflow-hidden rounded-xl shadow-md bg-white">
        {/* Slider Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${total * 100}%`,
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="min-w-full max-w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-2"
            >
              {/* Left Text */}
              <div className="w-full md:w-1/9 text-left space-y-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {banner.leftText.heading}
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-red-600">
                  {banner.leftText.subheading}
                </h3>
                <Link
                  href="#"
                  className="inline-block mt-3 bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 text-sm"
                >
                  {banner.leftText.buttonText} →
                </Link>
              </div>

              {/* Center Image */}
              <div className="w-full md:w-1/3 relative h-[220px] md:h-[320px]">
                <Image
                  src={banner.mainImage}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>

              {/* Right Tag Box */}
              <div className="w-full md:w-1/3 flex justify-end">
                <div className="inline-block text-center bg-[#edf7ff] px-6 py-4 rounded-lg shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-[#005bbb]">
                    {banner.rightTag.text}
                  </h3>
                  <p className="text-sm font-semibold text-red-500">
                    {banner.rightTag.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-gray-900 w-5"
                  : "bg-gray-400 hover:bg-gray-600 w-2.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
