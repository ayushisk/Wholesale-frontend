"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchCart } from "../../store/slices/cartSlice";
import { apiClient } from "../../lib/api";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [orderData, setOrderData] = useState({
    customerInfo: {
      name: "",
      email: "",
      companyName: "",
      shippingAddress: {
        line1: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (items.length === 0) {
      dispatch(fetchCart());
    }

    // Pre-fill form with user data
    if (user) {
      setOrderData({
        customerInfo: {
          name: user?.name || "",
          email: user.email || "",
          companyName: user.companyName || "",
          shippingAddress: {
            line1: user.shippingAddress?.line1 || "",
            city: user.shippingAddress?.city || "",
            postalCode: user.shippingAddress?.postalCode || "",
            country: user.shippingAddress?.country || "",
          },
        },
        notes: "",
      });
    }
  }, [isAuthenticated, user, items.length, dispatch, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "shippingAddress") {
        setOrderData((prev) => ({
          ...prev,
          customerInfo: {
            ...prev.customerInfo,
            shippingAddress: {
              ...prev.customerInfo.shippingAddress,
              [child]: value,
            },
          },
        }));
      } else {
        setOrderData((prev) => ({
          ...prev,
          customerInfo: {
            ...prev.customerInfo,
            [child]: value,
          },
        }));
      }
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!orderData.customerInfo?.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!orderData.customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!orderData.customerInfo.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!orderData.customerInfo.shippingAddress.line1.trim()) {
      newErrors.shippingLine1 = "Address is required";
    }
    if (!orderData.customerInfo.shippingAddress.city.trim()) {
      newErrors.shippingCity = "City is required";
    }
    if (!orderData.customerInfo.shippingAddress.postalCode.trim()) {
      newErrors.shippingPostalCode = "Postal code is required";
    }
    if (!orderData.customerInfo.shippingAddress.country.trim()) {
      newErrors.shippingCountry = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      const orderPayload = {
        orderId: `ORD-${Date.now()}`,
        customerInfo: orderData.customerInfo,
        items: items.map((item) => ({
          productId: item.productId._id,
          name: item.productId?.name,
          sku: item.productId.sku,
          selectedPack: item.selectedPack,
          quantity: item.quantity,
        })),
        orderTotal: totalAmount * 1.18, // Including tax
        notes: orderData.notes,
      };

      const response = await apiClient.createOrder(orderPayload);

      // Redirect to success page or orders page
      router.push(`/orders?success=true&orderId=${response.order?.orderId}`);
    } catch (error) {
      alert(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => router.push("/products")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = totalAmount;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.customerInfo?.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={orderData.customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={orderData.customerInfo.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.line1"
                      value={orderData.customerInfo.shippingAddress.line1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.shippingLine1 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingLine1}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.city"
                      value={orderData.customerInfo.shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.shippingCity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingCity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.postalCode"
                      value={orderData.customerInfo.shippingAddress.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.shippingPostalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingPostalCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.country"
                      value={orderData.customerInfo.shippingAddress.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.shippingCountry && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingCountry}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center space-x-3">
                  <Image
                    src={
                      item.productId?.images?.[0] ||
                      "/placeholder.svg?height=60&width=60" ||
                      "/placeholder.svg"
                    }
                    alt={item.productId?.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.productId?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.selectedPack.quantity} {item.selectedPack.unit} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{(item.selectedPack.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
