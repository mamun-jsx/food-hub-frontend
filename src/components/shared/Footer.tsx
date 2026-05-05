import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background py-4 border-t-2 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-600 text-sm text-center">
          &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
