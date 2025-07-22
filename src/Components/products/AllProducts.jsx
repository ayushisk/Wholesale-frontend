"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "@/store/actions/productActions";
import Link from "next/link";
import CategorySidebar from "../CategoryComponents/CategorySidebar";

export default function AllProducts() {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products || {});

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    } else {
      dispatch(fetchProducts());
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className="flex">
      {/* Left Sidebar: Categories */}
      <aside className="shrink-0 border-r border-gray-300 p-4 hidden md:block">
        <CategorySidebar
          onCategorySelect={setSelectedCategory}
          selectedCategorySlug={selectedCategory}
        />
      </aside>

      {/* Right Side: Product Grid */}
      <div className="flex-1">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-300 px-4 py-3">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="text-sm font-semibold text-gray-800">FILTERS</div>

            <div className="flex items-center gap-4 text-sm text-gray-700 flex-wrap">
              {" "}
              <select className="border border-gray-300 px-2 py-1 rounded-md">
                <option>Bundles</option>
                <option>Single Items</option>
                <option>Combo Sets</option>{" "}
              </select>{" "}
              <select className="border border-gray-300 px-2 py-1 rounded-md">
                <option>Country of Origin</option>
                <option>India</option>
                <option>Bangladesh</option>{" "}
              </select>{" "}
              <select className="border border-gray-300 px-2 py-1 rounded-md">
                <option>Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>{" "}
              </select>{" "}
              <select className="border border-gray-300 px-2 py-1 rounded-md">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>{" "}
              </select>{" "}
            </div>
          </div>
        </div>

        <main className="p-4">
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              // alert(product.slug),
              <Link key={product._id} href={`/products/${product.slug}`}>
                <div className="border border-gray-300 rounded-md p-2 cursor-pointer hover:shadow-md transition">
                  <div className="w-full h-56 overflow-hidden">
                    <img
                      src={product?.images?.[0]}
                      alt={product?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="mt-2 text-sm font-semibold">
                    {product?.name}
                  </h2>
                  <p className="text-xs text-gray-600">
                    {product.shortDescription}
                  </p>
                  <div className="mt-1 font-bold text-blue-600">
                    ₹{product.basePrice}
                  </div>
                  <div className="text-xs text-gray-400 line-through">
                    ₹{Math.round(product.basePrice * 1.8)}
                  </div>
                  <div className="text-xs text-green-600">
                    ({Math.floor(Math.random() * 40 + 40)}% OFF)
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
