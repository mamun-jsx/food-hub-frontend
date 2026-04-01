"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardSidebar() {
  const userData = useAuth();
  const userRole = userData?.data?.user?.role;

  const navItemsForAdmin = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Users", href: "/dashboard/users" },
  ];

  const navItemsForProvider = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Add Products", href: "/dashboard/add-products" },
    { name: "All Items", href: "/dashboard/meals" },
  ];

  const navItemsForUser = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "View Cart", href: "/dashboard/view-cart" },
  ];

  // ✅ choose based on role
  const navItems =
    userRole === "ADMIN"
      ? navItemsForAdmin
      : userRole === "PROVIDER"
        ? navItemsForProvider
        : navItemsForUser;

  return (
    <nav className="bg-white border-r h-screen w-64 fixed md:relative">
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">FoodHub</h1>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block px-4 py-2 rounded hover:bg-green-50 text-gray-800 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
