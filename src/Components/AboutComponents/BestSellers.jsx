"use client";

import Image from "next/image";
import React from "react";

const bestSellers = [
  {
    id: "113291",
    name: "Simply Colour Natural Black",
    image: "/images/about/products/p1.png",
    pack: "6 x NO 2",
    ean: "5060185678260",
  },
  {
    id: "392499",
    name: "The Pink Stuff Stain Remover",
    image: "/images/about/products/p2.png",
    pack: "8 x 500ML",
    ean: "5060033820186",
  },
  {
    id: "551201",
    name: "Paracetamol 500mg Capsules",
    image: "/images/about/products/p3.png",
    pack: "10 x 165",
    ean: "5060453406542",
  },
  {
    id: "308884",
    name: "Coca Cola Irish Full UK Stock",
    image: "/images/about/products/p4.png",
    pack: "24 x 330ML",
    ean: "5449000009966",
  },
  {
    id: "506169",
    name: "Astonish Window & Glass Cleaner",
    image: "/images/about/products/p5.png",
    pack: "12 x 750ML",
    ean: "5060060210219",
  },
  {
    id: "471988",
    name: "The Pink Stuff Multi Purpose Cleaner",
    image: "/images/about/products/p6.png",
    pack: "12 x 850ML",
    ean: "5060033822067",
  },
  {
    id: "227076",
    name: "Cadbury Timeout Wafers",
    image: "/images/about/products/p7.png",
    pack: "13 x 108g",
    ean: "7622202242201",
  },
  {
    id: "507551",
    name: "Gillette 2 Razor Disposable",
    image: "/images/about/products/p8.png",
    pack: "6 x 5's",
    ean: "3014260287030",
  },
  {
    id: "882333",
    name: "All About Home Gel Air Freshener",
    image: "/images/about/products/p9.png",
    pack: "8 x 3PK",
    ean: "5050895149273",
  },
  {
    id: "948862",
    name: "Sure A/P Deodorant Bright",
    image: "/images/about/products/p10.png",
    pack: "6 x 150ML",
    ean: "8710908799228",
  },
];

export default function BestSellers() {
  return (
    <section className="w-full bg-gradient-to-br from-[#fbd3e9] via-[#c6c2ff] to-[#d4ecff] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#3e0074] mb-10">
          Best Sellers
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center"
            >
              <div className="w-full h-32 flex justify-center items-center mb-3">
                <Image
                  src={product.image}
                  alt={product?.name}
                  width={120}
                  height={120}
                  className="object-contain rounded-lg"
                />
              </div>
              <p className="text-sm font-semibold line-clamp-2">
                {product?.name}
              </p>
              <p className="text-xs mt-1 text-gray-600">{product.pack}</p>
              <p className="text-xs text-gray-500">EAN: {product.ean}</p>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline mt-2 block"
              >
                Sign in to see prices
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
