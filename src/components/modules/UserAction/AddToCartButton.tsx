"use client";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { IMeal } from "@/types/meal.Type";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export default function AddToCartButton({ meal }: { meal: IMeal }) {
  const { addToCart } = useCart();
  const { data: session } = useAuth();
  const userRole = session?.user?.role;

  const handleAddToCart = () => {
    if (userRole === "ADMIN" || userRole === "PROVIDER") {
      toast.error("Admins and Providers cannot add items to cart");
      return;
    }

    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      quantity: 1,
    });

    toast.success(`${meal.name} added to cart!`, {
      icon: "🛒",
    });
  };

  if (userRole === "ADMIN" || userRole === "PROVIDER") {
    return null; // Or return a disabled button
  }

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="rounded-full bg-slate-900 px-8 hover:cursor-pointer hover:bg-primary-hover"
    >
      <ShoppingCart className="mr-2" size={20} />
      Add to Cart
    </Button>
  );
}
