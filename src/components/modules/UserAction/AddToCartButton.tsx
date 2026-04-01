"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMeal } from "@/types/meal.Type";

export default function AddToCartButton({ meal }: { meal: IMeal }) {
  const handleAddToCart = () => {
    // 1. Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // 2. Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === meal.id,
    );

    if (existingItemIndex > -1) {
      // Increase quantity if it exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't
      existingCart.push({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        quantity: 1,
      });
    }

    // 3. Save back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    // 4. Trigger custom event so Navbar updates instantly
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${meal.name} added to cart!`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="rounded-full bg-slate-900 px-8 hover:bg-green-600"
    >
      <ShoppingCart className="mr-2" size={20} />
      Add to Cart
    </Button>
  );
}
