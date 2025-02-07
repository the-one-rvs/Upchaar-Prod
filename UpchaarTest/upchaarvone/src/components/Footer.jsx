import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { getImageUrl } from "../utils";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <img
            className="w-[250px]"
            src={getImageUrl("Navbar/logoupchaar.png")}
          />
          <p className="mt-4 text-sm">
            Delivering authentic care through advanced A.I. solutions. Your
            health, our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-orange-400">
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-orange-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-orange-400">
                Services
              </a>
            </li>

            <li>
              <a href="/faq" className="hover:text-orange-400">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-400 text-white rounded-full hover:bg-orange-500"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-400 text-white rounded-full hover:bg-orange-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/upchaar-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-400 text-white rounded-full hover:bg-orange-500"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Upchaar. All rights reserved. |{" "}
          <a href="/terms" className="hover:text-orange-400">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:text-orange-400">
            Privacy Policy |{" "}
          </a>
          <a href="https://www.flaticon.com/" title="icons attribute">
            {" "}
            icons by Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
