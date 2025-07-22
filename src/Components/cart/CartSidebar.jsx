"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../store/slices/cartSlice";

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalAmount, isLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, isOpen]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    router.push("/checkout");
    onClose(); // close sidebar after navigating
  };

  const handleViewCart = () => {
    router.push("/cart");
    onClose();
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-md bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Please Login
                </h3>
                <p className="text-gray-600 mb-4">
                  You need to login to view your cart items
                </p>
                <Link
                  href="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={onClose}
                >
                  Login
                </Link>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-4">
                  Add some products to get started
                </p>
                <Link
                  href="/products"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={onClose}
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items in cart
                  </span>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-3 border-b pb-4"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={
                          item.productId?.images?.[0] ||
                          "/placeholder.svg?height=64&width=64"
                        }
                        alt={item.productId?.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.productId?.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {item.selectedPack.quantity} {item.selectedPack.unit}
                      </p>
                      <p className="text-sm font-medium text-indigo-600">
                        ₹{item.selectedPack.price}
                      </p>
                      <p className="text-xs text-gray-700 mt-1">
                        Subtotal: ₹
                        {(item.selectedPack.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {isAuthenticated && items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Total:</span>
                <span>₹{(totalAmount * 1.18).toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Tax</span>
                <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleViewCart}
                  className="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 text-center"
                >
                  View Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-center"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
