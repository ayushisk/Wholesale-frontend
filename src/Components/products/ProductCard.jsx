"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";

export default function ProductCard({ product }) {
  const [selectedPack, setSelectedPack] = useState(product.packOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity,
          selectedPack,
        })
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Please login to add items to wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product._id));
      } else {
        await dispatch(addToWishlist(product._id));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200">
            <Image
              src={
                product?.images[0] || "/placeholder.svg?height=200&width=200"
              }
              alt={product?.name}
              fill
              className="object-cover"
            />
          </div>

          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:text-red-500"
            } shadow-md transition-colors`}
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product?.name}
          </h3>

          {product.brand && (
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          )}

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          <div className="space-y-3">
            {/* Pack Options */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Pack Size
              </label>
              <select
                value={`${selectedPack.unit}-${selectedPack.price}`}
                onChange={(e) => {
                  const [unit, price] = e.target.value.split("-");
                  const pack = product.packOptions.find(
                    (p) =>
                      p.unit === unit && p.price === Number.parseFloat(price)
                  );
                  setSelectedPack(pack);
                }}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              >
                {product.packOptions.map((pack, index) => (
                  <option key={index} value={`${pack.unit}-${pack.price}`}>
                    {pack.quantity} {pack.unit} - ${pack.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number.parseInt(e.target.value) || 1)
                }
                className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">
                ${(selectedPack.price * quantity).toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                ${selectedPack.price} per {selectedPack.unit}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={
                isAddingToCart || product.stock?.status === "out_of_stock"
              }
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm font-medium transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                {isAddingToCart
                  ? "Adding..."
                  : product.stock?.status === "out_of_stock"
                  ? "Out of Stock"
                  : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
