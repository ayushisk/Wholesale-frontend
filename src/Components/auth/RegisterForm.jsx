"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  registerUser,
  clearError,
  clearRegistrationSuccess,
} from "../../store/slices/authSlice";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    shippingAddress: {
      line1: "",
      city: "",
      postalCode: "",
      country: "",
    },
    billingAddress: {
      line1: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        dispatch(clearRegistrationSuccess());
        router.push("/login");
      }, 3000);
    }
  }, [registrationSuccess, router, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSameAsShipping = (e) => {
    setSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setFormData({
        ...formData,
        billingAddress: { ...formData.shippingAddress },
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name.trim()) newErrors?.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    // Address validation
    if (!formData.shippingAddress.line1.trim())
      newErrors.shippingLine1 = "Shipping address is required";
    if (!formData.shippingAddress.city.trim())
      newErrors.shippingCity = "Shipping city is required";
    if (!formData.shippingAddress.postalCode.trim())
      newErrors.shippingPostalCode = "Shipping postal code is required";
    if (!formData.shippingAddress.country.trim())
      newErrors.shippingCountry = "Shipping country is required";

    if (!sameAsShipping) {
      if (!formData.billingAddress.line1.trim())
        newErrors.billingLine1 = "Billing address is required";
      if (!formData.billingAddress.city.trim())
        newErrors.billingCity = "Billing city is required";
      if (!formData.billingAddress.postalCode.trim())
        newErrors.billingPostalCode = "Billing postal code is required";
      if (!formData.billingAddress.country.trim())
        newErrors.billingCountry = "Billing country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = { ...formData };
    if (sameAsShipping) {
      submitData.billingAddress = { ...formData.shippingAddress };
    }

    dispatch(registerUser(submitData));
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Registration Successful!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Your account has been created successfully. Please wait for admin
              approval before you can login.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors?.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="shippingAddress.line1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.line1"
                    value={formData.shippingAddress.line1}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.shippingLine1 && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shippingLine1}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="shippingAddress.city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.city"
                    value={formData.shippingAddress.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.shippingCity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shippingCity}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="shippingAddress.postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.postalCode"
                    value={formData.shippingAddress.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.shippingPostalCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shippingPostalCode}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="shippingAddress.country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.country"
                    value={formData.shippingAddress.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.shippingCountry && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shippingCountry}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Billing Address
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={handleSameAsShipping}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Same as shipping address
                  </span>
                </label>
              </div>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="billingAddress.line1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      name="billingAddress.line1"
                      value={formData.billingAddress.line1}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.billingLine1 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.billingLine1}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="billingAddress.city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      name="billingAddress.city"
                      value={formData.billingAddress.city}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.billingCity && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.billingCity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="billingAddress.postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="billingAddress.postalCode"
                      value={formData.billingAddress.postalCode}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.billingPostalCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.billingPostalCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="billingAddress.country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      name="billingAddress.country"
                      value={formData.billingAddress.country}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.billingCountry && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.billingCountry}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
