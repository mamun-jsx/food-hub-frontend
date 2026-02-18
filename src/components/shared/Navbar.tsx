"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <nav className="bg-white shadow-md fixed w-full z-50 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-600">
                FoodHub
              </Link>
            </div>

            {/* Center - Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-black hover:text-green-600  transition"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-black hover:text-green-600 transition"
              >
                Dashboard
              </Link>
            </div>

            {/* Right - Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-black hover:text-green-600">
                Login
              </Link>
              <Link href="/logout" className="text-black hover:text-green-600">
                Logout
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 text-black  px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                SignIn
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/logout" onClick={() => setIsOpen(false)}>
                Logout
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 text-black px-4 py-2 rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                SignIn
              </Link>
            </div>
          </div>
        )}
      </nav>
      <h2 className="h-16.75"></h2>
    </section>
  );
}
