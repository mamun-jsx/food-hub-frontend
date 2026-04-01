"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { authClient } from "../../../service/auth/auth";
import { useRouter } from "next/navigation";
import LoadingBtn from "./LoadingBtn";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // ... (your existing state)
  const [cartItems, setCartItems] = useState<any[]>([]);

  // 1. Function to fetch latest data
  const updateCartCount = () => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      return JSON.parse(savedCart);
    } else {
      return [];
    }
  };

  useEffect(() => {
    // Run once on mount
    setCartItems(updateCartCount());

    // 2. Listen for the custom "cartUpdated" event from your AddToCart button
    window.addEventListener("cartUpdated", () => {
      setCartItems(updateCartCount());
    });

    // 3. Listen for changes from other tabs (optional but good)
    window.addEventListener("storage", () => {
      setCartItems(updateCartCount());
    });

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("cartUpdated", () => {
        setCartItems(updateCartCount());
      });
      window.removeEventListener("storage", () => {
        setCartItems(updateCartCount());
      });
    };
  }, []);

  // get user session as current user..
  const { data: session, isPending } = authClient.useSession();

  //  logout function
  const logOutFnc = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

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
                href="/provider"
                className="text-black hover:text-green-600  transition"
              >
                Providers
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-black hover:text-green-600 transition"
                >
                  Dashboard
                </Link>
              )}

              <Link
                href="/product"
                className="text-black hover:text-green-600 transition"
              >
                Products
              </Link>
            </div>
            {session && (
              <Link
                className="flex items-center bg-black p-3   rounded-full"
                href={"/dashboard/view-cart"}
              >
                <ShoppingCart className="text-white" />
                <span className="text-white">
                  {cartItems ? cartItems.length : 0}
                </span>
              </Link>
            )}
            {/* Right - Desktop Auth Buttons */}
            {isPending ? (
              <LoadingBtn />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                {!session && (
                  <Link
                    href="/login"
                    className="bg-black text-white  px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Login
                  </Link>
                )}
                {isPending ? (
                  <p>Loading...</p>
                ) : session ? (
                  <button
                    onClick={logOutFnc}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                  >
                    Logout
                  </button>
                ) : (
                  ""
                )}
                {session && <Link href={"/profile"}>Profile</Link>}

                {/* login register  */}

                {!session && (
                  <Link
                    href="/register"
                    className="bg-green-600 text-white  px-4 py-2 rounded-lg hover:bg-black transition"
                  >
                    Register
                  </Link>
                )}
              </div>
            )}

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

              {session && (
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              )}

              {!session && (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
              {session && (
                <button onClick={() => setIsOpen(false)}>Logout</button>
              )}
              {!session && (
                <Link
                  href="/signup"
                  className="bg-green-600 text-black px-4 py-2 rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <h2 className="h-16.75"></h2>
    </section>
  );
}
