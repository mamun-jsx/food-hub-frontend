"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ViewCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false); // Prevents hydration mismatch
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  const userData = useAuth();
  const userId = userData?.data?.user?.id;

  // 1. Load cart only after component mounts in the browser
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing cart:", err);
      }
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) =>
    updateCart(cartItems.filter((item) => item.id !== id));

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

  const handleConfirmOrder = async () => {
    if (!address.trim()) return alert("Please enter a delivery address");
    setIsPlacing(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            address,
            items: cartItems,
            totalPrice,
          }),
        },
      );

      if (response.ok) {
        localStorage.removeItem("cartItems");
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));
        setShowAddressModal(false);
        alert("Order Placed Successfully!");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsPlacing(false);
    }
  };

  // 2. Return null or a skeleton while waiting for mounting
  if (!mounted) return <div className="p-10 text-center">Loading...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/product">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-10 relative">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="border-slate-200">
              <CardContent className="p-4 flex items-center gap-4">
                {/* Parent MUST have relative for Image fill to work */}
                <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.png"} // Fallback image
                    alt={item.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-green-600 font-bold">{item.price} TK</p>
                </div>
                <div className="flex items-center gap-2 border rounded-lg px-2">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="p-1"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    className="p-1"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border h-fit shadow-sm">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between text-xl font-extrabold mb-6">
            <span>Total</span>
            <span>{totalPrice} TK</span>
          </div>
          <Button
            onClick={() => setShowAddressModal(true)}
            className="w-full bg-green-600 hover:bg-black py-6 rounded-xl"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      {/* --- ADDRESS MODAL --- */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-green-600" /> Delivery Address
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Please enter your full address to confirm the order.
            </p>

            <input
              type="text"
              placeholder="e.g. House 12, Road 5, Dhaka"
              className="w-full border-2 border-slate-200 rounded-xl p-3 mb-6 focus:border-green-600 outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isPlacing || !address}
                className="flex-1 bg-green-600 hover:bg-black"
                onClick={handleConfirmOrder}
              >
                {isPlacing ? "Placing..." : "Confirm Order"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
