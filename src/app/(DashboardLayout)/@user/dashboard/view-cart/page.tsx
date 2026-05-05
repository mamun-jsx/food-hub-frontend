"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { placeOrder } from "../../../../../../service/user-api-endpoint";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ViewCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);
  const router = useRouter();

  const userData = useAuth();
  const userId = userData?.data?.user?.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const changeQuantity = (id: string, delta: number, currentQty: number) => {
    updateQuantity(id, Math.max(1, currentQty + delta));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    setIsPlacing(true);
    const toastId = toast.loading("Placing your order...");

    try {
      const result = await placeOrder({
        userId,
        address,
        items: cartItems,
        totalPrice,
      });

      if (result.success) {
        clearCart();
        setShowAddressModal(false);
        toast.success("Order Placed Successfully!", { id: toastId });
        router.push("/dashboard/orders");
      } else {
        toast.error(result.message || "Failed to place order.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setIsPlacing(false);
    }
  };

  if (!mounted) return <Loader />;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm m-6">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link href="/meals">
          <Button className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 transition-all">
            Browse Meals
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500">
            {cartItems.length} items in your basket
          </p>
        </div>
        <Button
          onClick={() => setShowAddressModal(true)}
          className="bg-primary hover:bg-black text-white px-8 py-6 rounded-full font-bold shadow-lg shadow-primary/20 transition-all"
        >
          Checkout All Items
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden"
            >
              <CardContent className="p-6 flex items-center gap-6">
                <div className="relative h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-primary font-black text-xl">
                    {item.price} TK
                  </p>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
                    <button
                      onClick={() => changeQuantity(item.id, -1, item.quantity)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(item.id, 1, item.quantity)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.name)}
                    className="text-red-400 hover:text-red-600 p-2 transition-colors"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{totalPrice} TK</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <div className="flex justify-between text-2xl font-black text-gray-900">
                <span>Total</span>
                <span>{totalPrice} TK</span>
              </div>
            </div>
            <Button
              onClick={() => setShowAddressModal(true)}
              className="w-full bg-primary hover:bg-black py-7 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
            >
              Confirm Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* --- ADDRESS MODAL --- */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md relative animate-in fade-in zoom-in duration-300 shadow-2xl">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="mb-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Address
              </h2>
              <p className="text-gray-500 mt-2">
                Where should we send your delicious meal?
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. House 12, Road 5, Dhaka"
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 focus:border-primary focus:bg-white outline-none transition-all"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 py-6 rounded-2xl border-2 border-gray-100 font-bold"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isPlacing || !address}
                  className="flex-1 bg-primary hover:bg-black py-6 rounded-2xl font-bold shadow-lg shadow-primary/10"
                  onClick={handleConfirmOrder}
                >
                  {isPlacing ? "Placing..." : "Order Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
