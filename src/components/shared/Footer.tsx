"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/assets/footerImage.png";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing! 💌");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Left Section: Logo & Paragraph */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <img
              src={footerLogo.src}
              alt="FoodHub Logo"
              className="w-auto h-16 object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Bringing the finest culinary experiences straight to your doorstep.
            We partner with the best local chefs to ensure quality, taste, and
            speed in every delivery.
          </p>
        </div>

        {/* Middle Section: Important Links */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
            Important Links
          </h3>
          <ul className="space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "All Meals", href: "/meals" },
              { name: "Providers", href: "/provider" },
              { name: "Contact", href: "/contact" },
              { name: "Privacy Policy", href: "/privacy-policy" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Social & Email */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/5 p-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="max-w-md">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="relative group">
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all group-hover:border-white/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-white px-4 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-[10px] text-gray-500 mt-3 ml-2 italic">
              Subscribe for weekly recipes and exclusive discounts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>
        <p className="text-xs font-bold text-gray-400">
          Developed by{" "}
          <a
            href="https://github.com/mamun-jsx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary italic hover:underline underline-offset-4 transition-all"
          >
            Abdullah Al Mamun
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
