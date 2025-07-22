"use client";

import { MapPin, Phone, CalendarDays, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative w-full h-screen">
      {/* Google Map iframe as background */}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.551479359098!2d-2.2423315!3d53.4958895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1c5d7f2ef11%3A0x2b7e610d1ecf3b2c!2s90%20North%20St%2C%20Manchester%20M8%208RA%2C%20UK!5e0!3m2!1sen!2sin!4v1719910000000!5m2!1sen!2sin"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Contact Details Box */}
      <div className="absolute top-10 right-10 bg-white p-8 rounded-md shadow-md max-w-sm z-10">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Our Showroom / Warehouse
        </h2>

        <div className="flex items-start mb-4">
          <MapPin className="w-5 h-5 mt-1 mr-2 text-gray-600" />
          <div>
            <p className="font-semibold italic">Rayburn Trading</p>
            <p>90 North Street</p>
            <p>Manchester</p>
            <p>M8 8RA</p>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <Phone className="w-5 h-5 mr-2 text-gray-600" />
          <p>
            <span className="font-semibold">Telephone:</span> +44 (0) 161 214
            1300
          </p>
        </div>

        <div className="flex items-center mb-1">
          <CalendarDays className="w-5 h-5 mr-2 text-gray-600" />
          <p className="font-semibold">Monday - Friday</p>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          <p>07:30am – 17:00pm</p>
        </div>

        <p className="font-semibold">Saturday</p>
        <p className="mb-1">Closed</p>
        <p className="font-semibold">Sunday</p>
        <p>Closed</p>
      </div>
    </div>
  );
}
