"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    const defaultPack = product.packOptions?.[0] || {
      unit: "piece",
      quantity: 1,
      price: product.basePrice,
    };

    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
        selectedPack: defaultPack,
      })
    );

    dispatch(removeFromWishlist(product._id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please Login
          </h2>
          <p className="text-gray-600 mb-6">
            You need to login to view your wishlist
          </p>
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">Save items you love for later</p>
          <Link
            href="/products"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{items.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={
                      product?.images?.[0] ||
                      "/placeholder.svg?height=200&width=200" ||
                      "/placeholder.svg"
                    }
                    alt={product?.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 line-clamp-2">
                    {product?.name}
                  </h3>
                </Link>

                {product.brand && (
                  <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                )}

                <div className="mt-2">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{product.basePrice}
                  </span>
                  {product.packOptions?.[0] && (
                    <p className="text-sm text-gray-600">
                      {product.packOptions[0].quantity}{" "}
                      {product.packOptions[0].unit}
                    </p>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    href="/cart"
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Move to Cart</span>
                  </Link>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center"
                  >
                    View Details
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
