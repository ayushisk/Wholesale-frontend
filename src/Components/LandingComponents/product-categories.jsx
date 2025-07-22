"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCategories() {
  const categories = [
    {
      id: 1,
      category: "Personal Care",
      productName: "Fragnance & Body Care",
      image: "/category/Fragnance.jpg",
      bgColor: "bg-gray-200",
      textColor: "text-gray-700",
      buttonColor: "bg-gray-800 text-white",
      link: "/category/Fragnance",
    },
    {
      id: 2,
      category: "Home & Living",
      productName: "Dishwasher & Cleaning",
      image: "/category/Dishwasher.jpg",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600 text-white",
      link: "/category/Dishwasher",
    },
    {
      id: 3,
      category: "Food & Drinks",
      productName: "Grocery & Beverages",
      image: "/category/Drinks.jpg",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      buttonColor: "bg-yellow-600 text-white",
      link: "/category/Drinks",
    },
    {
      id: 4,
      category: "Stationery & Toys",
      productName: "TOY TRAIN",
      image: "/category/Stationery.jpg",
      bgColor: "bg-pink-100",
      textColor: "text-pink-700",
      buttonColor: "bg-pink-600 text-white",
      link: "/category/Stationery",
    },
    {
      id: 5,
      category: "Textiles & Party Decors",
      productName: "PARTY DECORS",
      image: "/category/Party.jpg",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      buttonColor: "bg-green-600 text-white",
      link: "/category/Party",
    },
    {
      id: 6,
      category: "Seasonal & Gifts",
      productName: "RING & JEWELRY",
      image: "/category/RING.jpg",
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      buttonColor: "bg-rose-600 text-white",
      link: "/category/jewelry",
    },
  ];

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Product Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.bgColor} rounded-2xl p-6 h-80 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <p
                    className={`text-sm font-medium ${category.textColor} opacity-80`}
                  >
                    {category.category}
                  </p>
                  <h2
                    className={`text-3xl font-bold ${category.textColor} mt-1`}
                  >
                    {category.productName}
                  </h2>
                </div>

                <div className="flex-1 flex items-center justify-end">
                  <div className="w-32 h-32 relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.productName}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Link href={category.link}>
                    <button
                      className={`${category.buttonColor} px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      SHOP NOW
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
