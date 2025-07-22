"use client"
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fdf1de] text-[#444] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-300">
        {/* Address */}
        <div className="leading-relaxed">
          <h4 className="text-lg font-semibold text-black mb-3 tracking-wide">
            Address
          </h4>
          <p className="text-sm font-light">Harsh Clean Dhan Pvt. Ltd.</p>
          <p className="text-sm font-light">
            11/2A, Pusa Road, Karol Bagh New Delhi – 110005, Delhi
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3 tracking-wide">
            Pages
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link href="/" className="hover:opacity-80 transition-opacity">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:opacity-80 transition-opacity"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:opacity-80 transition-opacity"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:opacity-80 transition-opacity"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:opacity-80 transition-opacity"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3 tracking-wide">
            My Account
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link
                href="/account"
                className="hover:opacity-80 transition-opacity"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:opacity-80 transition-opacity"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="hover:opacity-80 transition-opacity"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="hover:opacity-80 transition-opacity"
              >
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3 tracking-wide">
            Policies
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:opacity-80 transition-opacity"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:opacity-80 transition-opacity"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/return-policy"
                className="hover:opacity-80 transition-opacity"
              >
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-policy"
                className="hover:opacity-80 transition-opacity"
              >
                Shipping Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center py-4 text-xs text-gray-500 font-light">
        Copyright © 2023{" "}
        <span className="font-medium">Harsh Clean Dhan Pvt. Ltd.</span> All
        Rights Reserved. Developed by{" "}
        <span className="font-medium text-black">ADN Online Services</span>.
      </div>
    </footer>
  );
}
