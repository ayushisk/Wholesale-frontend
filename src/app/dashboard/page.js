"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Heart,
  ShoppingCart,
  User,
  FileText,
  LogOut,
} from "lucide-react";
import { logoutUser } from "../../store/slices/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemCount, totalAmount } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const dashboardItems = [
    {
      title: "My Orders",
      description: "View and track your orders",
      icon: Package,
      href: "/orders",
      color: "bg-blue-500",
    },
    {
      title: "Wishlist",
      description: `${wishlistItems.length} items saved`,
      icon: Heart,
      href: "/wishlist",
      color: "bg-red-500",
    },
    {
      title: "Shopping Cart",
      description: `${itemCount} items - ₹${totalAmount.toFixed(2)}`,
      icon: ShoppingCart,
      href: "/cart",
      color: "bg-green-500",
    },
    {
      title: "Profile",
      description: "Manage your account settings",
      icon: User,
      href: "/profile",
      color: "bg-purple-500",
    },
    {
      title: "Request Quote",
      description: "Get quotes for bulk orders",
      icon: FileText,
      href: "/quote",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Company: {user?.companyName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`${item.color} p-3 rounded-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/products"
              className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center hover:bg-indigo-100 transition-colors"
            >
              <h3 className="font-medium text-indigo-900">Browse Products</h3>
              <p className="text-sm text-indigo-600 mt-1">
                Explore our catalog
              </p>
            </Link>
            <Link
              href="/categories"
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
            >
              <h3 className="font-medium text-green-900">Categories</h3>
              <p className="text-sm text-green-600 mt-1">Shop by category</p>
            </Link>
            <Link
              href="/quote"
              className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition-colors"
            >
              <h3 className="font-medium text-orange-900">Request Quote</h3>
              <p className="text-sm text-orange-600 mt-1">Bulk order quotes</p>
            </Link>
            <Link
              href="/contact"
              className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-medium text-purple-900">Contact Us</h3>
              <p className="text-sm text-purple-600 mt-1">Get support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
