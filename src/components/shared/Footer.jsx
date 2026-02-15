"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-700 text-neutral-content py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              Care<span className="text-accent">.io</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Trusted caregiving services for babies, elderly, and sick family
              members.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Connect with Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
            <p className="text-gray-400">Email: support@care.io</p>
            <p className="text-gray-400">Phone: +8801XXXXXXXXX</p>
          </div>
        </div>

        <div className="mt-16 border-t border-base-300 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Care.io. All rights reserved.
        </div>
      </footer>
    </>
  );
}
