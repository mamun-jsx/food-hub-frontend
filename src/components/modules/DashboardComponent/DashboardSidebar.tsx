import Link from "next/link";
import React from "react";

export default function DashboardSidebar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Add Products", href: "/dashboard/add-products" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Users", href: "/dashboard/users" },
  ];

  return (
    <nav className="bg-white border-r h-screen w-64 fixed md:relative">
      <div className="px-6 py-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600 mb-8">FoodHub</h1>

        {/* Navigation Items */}
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
