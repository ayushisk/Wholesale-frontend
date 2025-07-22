// "use client";

// import { useParams } from "next/navigation";
// import Image from "next/image";
// import React from "react";

// const products = [
//   // Fragnance
//   {
//     id: 1,
//     name: "Lavender Body Wash",
//     category: "Fragnance",
//     image: "/products/lavender.jpg",
//   },
//   {
//     id: 2,
//     name: "Rose Perfume",
//     category: "Fragnance",
//     image: "/products/rose.jpg",
//   },
//   {
//     id: 3,
//     name: "Vanilla Mist",
//     category: "Fragnance",
//     image: "/products/vanilla.jpg",
//   },
//   {
//     id: 4,
//     name: "Ocean Breeze Spray",
//     category: "Fragnance",
//     image: "/products/ocean.jpg",
//   },
//   {
//     id: 5,
//     name: "Musk Cologne",
//     category: "Fragnance",
//     image: "/products/musk.jpg",
//   },
//   {
//     id: 6,
//     name: "Citrus Scent Oil",
//     category: "Fragnance",
//     image: "/products/citrus.jpg",
//   },

//   // Dishwasher
//   {
//     id: 7,
//     name: "Dishwasher Liquid",
//     category: "Dishwasher",
//     image: "/products/dishwasher.jpg",
//   },
//   {
//     id: 8,
//     name: "Dish Pods",
//     category: "Dishwasher",
//     image: "/products/pods.jpg",
//   },
//   {
//     id: 9,
//     name: "Dish Brush",
//     category: "Dishwasher",
//     image: "/products/brush.jpg",
//   },
//   {
//     id: 10,
//     name: "Sponge Pack",
//     category: "Dishwasher",
//     image: "/products/sponge.jpg",
//   },
//   {
//     id: 11,
//     name: "Drying Mat",
//     category: "Dishwasher",
//     image: "/products/mat.jpg",
//   },
//   {
//     id: 12,
//     name: "Dish Rack",
//     category: "Dishwasher",
//     image: "/products/rack.jpg",
//   },

//   // Drinks
//   {
//     id: 13,
//     name: "Grape Juice",
//     category: "Drinks",
//     image: "/products/juice.jpg",
//   },
//   {
//     id: 14,
//     name: "Orange Soda",
//     category: "Drinks",
//     image: "/products/orange.jpg",
//   },
//   {
//     id: 15,
//     name: "Lemon Water",
//     category: "Drinks",
//     image: "/products/lemon.jpg",
//   },
//   { id: 16, name: "Iced Tea", category: "Drinks", image: "/products/tea.jpg" },
//   {
//     id: 17,
//     name: "Energy Drink",
//     category: "Drinks",
//     image: "/products/energy.jpg",
//   },
//   {
//     id: 18,
//     name: "Sparkling Water",
//     category: "Drinks",
//     image: "/products/sparkling.jpg",
//   },
// ];

// export default function CategoryPage() {
//   const params = useParams();
//   const categoryName = params.category;

//   const filteredProducts = products.filter(
//     (product) => product.category.toLowerCase() === categoryName.toLowerCase()
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 capitalize">
//         Products in {categoryName}
//       </h1>

//       {filteredProducts.length === 0 ? (
//         <p className="text-gray-600">No products found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//             >
//               <div className="w-full h-40 relative mb-4">
//                 <Image
//                   src={product.image}
//                   alt={product?.name}
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//               <h3 className="text-lg font-semibold text-center">
//                 {product?.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  // Fragnance
  {
    id: 1,
    name: "Lavender Body Wash",
    category: "Fragnance",
    image: "/products/lavender.jpg",
  },
  {
    id: 2,
    name: "Rose Perfume",
    category: "Fragnance",
    image: "/products/rose.jpg",
  },
  {
    id: 3,
    name: "Vanilla Mist",
    category: "Fragnance",
    image: "/products/vanilla.jpg",
  },
  {
    id: 4,
    name: "Ocean Breeze Spray",
    category: "Fragnance",
    image: "/products/ocean.jpg",
  },
  {
    id: 5,
    name: "Musk Cologne",
    category: "Fragnance",
    image: "/products/musk.jpg",
  },
  {
    id: 6,
    name: "Citrus Scent Oil",
    category: "Fragnance",
    image: "/products/citrus.jpg",
  },

  // Dishwasher
  {
    id: 7,
    name: "Dishwasher Liquid",
    category: "Dishwasher",
    image: "/products/dishwasher.jpg",
  },
  {
    id: 8,
    name: "Dish Pods",
    category: "Dishwasher",
    image: "/products/pods.jpg ",
  },
  {
    id: 9,
    name: "Dish Brush",
    category: "Dishwasher",
    image: "/products/brush.jpg",
  },
  {
    id: 10,
    name: "Sponge Pack",
    category: "Dishwasrher",
    image: "/products/sponge.jpg",
  },
  {
    id: 11,
    name: "Drying Mat",
    category: "Dishwasher",
    image: "/products/mat.jpg",
  },
  {
    id: 12,
    name: "Dish Rack",
    category: "Dishwasher",
    image: "/products/rack.jpg",
  },

  // Drinks
  {
    id: 13,
    name: "Grape Juice",
    category: "Drinks",
    image: "/products/juice.jpg",
  },
  {
    id: 14,
    name: "Orange Soda",
    category: "Drinks",
    image: "/products/orange.jpg",
  },
  {
    id: 15,
    name: "Lemon Water",
    category: "Drinks",
    image: "/products/lemon.jpg",
  },
  { id: 16, name: "Iced Tea", category: "Drinks", image: "/products/tea.jpg" },
  {
    id: 17,
    name: "Energy Drink",
    category: "Drinks",
    image: "/products/energy.jpg",
  },
  {
    id: 18,
    name: "Sparkling Water",
    category: "Drinks",
    image: "/products/sparkling.jpg",
  },
];

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.category;

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Products in {categoryName}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${encodeURIComponent(product?.name)}`}
            >
              <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
                <div className="w-full h-40 relative mb-4">
                  <Image
                    src={product.image}
                    alt={product?.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {product?.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
