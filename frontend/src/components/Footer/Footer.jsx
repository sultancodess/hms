import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#dcecf8] text-zinc-800 py-6">
      {/* Top Section - Links */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">MEDICARE</h2>
          <p className="text-sm text-zinc-600 mt-2">
            Your trusted partner in healthcare. Delivering care with compassion and precision.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#faq" className="hover:underline">FAQ</a>
        </div>

        {/* Social Media */}
        <div className="flex gap-4">
          <a
            href="https://x.com/Sultan_Alam_21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.instagram.com/sultan.codes/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sultan-alam436/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-blue-700"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center border-t border-zinc-300 pt-4">
        <p className="text-sm">&copy; 2024, Made with ❤️ by Team CodeX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
