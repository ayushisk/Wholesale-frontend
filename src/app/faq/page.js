"use client";

import Image from "next/image";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: "url('/faq.jpg')" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-12 text-center ">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            How can we help?
          </h1>
          <div className="mt-6 ">
            <input
              type="text"
              placeholder="Search the help center"
              className="w-full md:w-2/3 px-5 py-3 rounded-full border backdrop-blur-sm  border-gray-300 shadow-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Background Illustration */}
      {/* <div className="w-full">
        <Image
          src="/faq"
          alt="FAQ Header Art"
          width={1400}
          height={200}
          className="mx-auto mb-10"
        />
      </div> */}

      {/* FAQ Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 pb-16">
        <FAQCard
          title="Ordering"
          desc="How to place and manage your orders with us."
          buttonText="View Info"
          color="bg-[#fbe4e4]"
          link="#ordering"
        />
        <FAQCard
          title="New Customers"
          desc="Learn how to become a Rayburn customer today."
          buttonText="Get Started"
          color="bg-[#ffeab5]"
          link="#new"
        />
        <FAQCard
          title="Payments"
          desc="Details about why online payments aren’t available."
          buttonText="Learn Why"
          color="bg-[#fde9f3]"
          link="#payment"
        />
        <FAQCard
          title="Shipping & Delivery"
          desc="Delivery matrix, heavy items policy, and export."
          buttonText="Read FAQs"
          color="bg-[#ddf4d9]"
          link="#shipping"
        />
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 pb-24 text-gray-700 text-[15px] space-y-8 leading-relaxed">
        <div id="ordering">
          <h2 className="text-xl font-bold mb-2">How do I place an order?</h2>
          <p>
            Existing customers can place an order on this website, scan their
            own order in our showroom using a fob, speak to our sales team, or
            request a representative visit.
          </p>
        </div>

        <div id="new">
          <h2 className="text-xl font-bold mb-2">
            I'm a new customer, can I call in and place an order today?
          </h2>
          <p>
            Yes, absolutely. You’ll need to open an account and pay upfront.
            Once done, you can place an order and collect the same day (subject
            to our terms and conditions).
          </p>
        </div>

        <div id="payment">
          <h2 className="text-xl font-bold mb-2">Why can't I pay online?</h2>
          <p>
            We pride ourselves on personal service. A member of our sales team
            will contact you to confirm availability, shipping, and may
            recommend additional products suited to your business or region.
          </p>
        </div>

        <div id="shipping">
          <h2 className="text-xl font-bold mb-2">
            Shipping, Delivery & Export
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              UK Minimum Order: £1600 ex. VAT (Rayburn vehicles), or £2500 ex.
              VAT in London/south/north Scotland.
            </li>
            <li>See the UK delivery matrix at the bottom of the page.</li>
            <li>
              We offer exports to 🇮🇪 🇲🇹 🇪🇸 🇦🇺 🇺🇸 🇩🇰 🇮🇳 🇮🇶 🇫🇮 🇸🇪 🇬🇭 🇳🇬 — see our
              Export page.
            </li>
            <li>
              Bulky orders (e.g. kitchen rolls, drinks) may incur delivery
              charges. You’ll be notified in advance.
            </li>
            <li>
              Orders within our matrix must be placed 48h in advance to ensure
              timely delivery.
            </li>
            <li>
              Orders outside our matrix can be shipped via third-party couriers
              (contact our Transport Dept).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            Can I use your photography and media?
          </h2>
          <p>
            Yes. All images on our website can be used by customers to advertise
            products. Higher-resolution assets are available upon request
            (charges may apply).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Want to become a customer?</h2>
          <p>
            Click "Become a Customer" at the top-right of this page. A team
            member will contact you shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable card component
function FAQCard({ title, desc, buttonText, color, link }) {
  return (
    <div className={`rounded-xl shadow-sm p-5 ${color}`}>
      <h3 className="font-bold text-lg text-[#1a1a1a] mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      <a href={link}>
        <button className="bg-[#1a73e8] text-white px-4 py-2 rounded text-sm hover:bg-[#1558b0] transition">
          {buttonText}
        </button>
      </a>
    </div>
  );
}
