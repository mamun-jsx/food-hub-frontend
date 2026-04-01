"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // 2. Helper to save and sync changes
  const updateCart = (newCart: any[]) => {
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    // Trigger event for Navbar to update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 3. Actions: Remove, Increase, Decrease
  const removeItem = (id: string) => {
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  const changeQuantity = (id: string, delta: number) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(newCart);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  if (!isLoaded)
    return (
      <div className="p-10 text-center text-gray-500">Loading your cart...</div>
    );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <ShoppingBag size={64} className="text-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <Link href="/product">
          <Button className="bg-green-600 hover:bg-black transition">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-slate-200">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-green-600 font-bold">{item.price} TK</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border rounded-lg px-2">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="p-1 hover:text-green-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    className="p-1 hover:text-green-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                >
                  <Trash2 size={20} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-6 rounded-2xl h-fit border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 border-b pb-4 mb-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{totalPrice} TK</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
          </div>
          <div className="flex justify-between text-xl font-extrabold mb-6">
            <span>Total</span>
            <span>{totalPrice} TK</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-black py-6 text-lg rounded-xl">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
