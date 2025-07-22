"use client";

import Image from "next/image";
import { FileText, User, Code2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1a1a4b]">Legal Terms</h1>
        <p className="mt-2 text-gray-700">
          Welcome! Come on in to learn what’s up and what’s down, legally
          speaking, when using Eventbrite.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[
            "Terms of Service",
            "Community Guidelines",
            "Privacy Policy",
            "Cookie Statement",
          ].map((tab) => (
            <button
              key={tab}
              className="bg-white border border-orange-500 text-orange-500 font-semibold py-2 px-4 rounded hover:bg-orange-100 transition"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-12 flex justify-center">
        <Image
          src="/privacy.jpg" // place in `public/` folder
          alt="Illustration"
          width={500}
          height={400}
          className="rounded-md"
        />
      </div>

      {/* Cards Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Consumer */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-2 text-blue-700" />
            <h3 className="text-xl font-semibold text-blue-700">Consumer</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Browsing, purchasing, interacting with other Eventbrite users, and
            your privacy
          </p>
          <ul className="space-y-1 text-sm text-blue-600">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Statement</li>
            <li>Community Guidelines</li>
            <li>Eventbrite Insiders (Beta)</li>
            <li>Data Protection FAQ</li>
          </ul>
        </div>

        {/* Organizer */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 mr-2 text-blue-700" />
            <h3 className="text-xl font-semibold text-blue-700">Organizer</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Account and event creation, payment processing, refunds, and data
            privacy
          </p>
          <ul className="space-y-1 text-sm text-blue-600">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Statement</li>
            <li>Community Guidelines</li>
            <li>Merchant Agreement</li>
            <li>Organizer Refund Policy Requirements</li>
          </ul>
        </div>

        {/* 3rd Party */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Code2 className="w-6 h-6 mr-2 text-blue-700" />
            <h3 className="text-xl font-semibold text-blue-700">3rd Party</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Developers, IP owners, Eventbrite vendors, processors &
            subprocessors
          </p>
          <ul className="space-y-1 text-sm text-blue-600">
            <li>Terms of Service</li>
            <li>API Terms of Use</li>
            <li>Trademark & Copyright Policy</li>
            <li>Data Processing Addendum (DPA)</li>
            <li>Data Protection FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
