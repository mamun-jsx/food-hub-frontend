"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  providerId: string;
  category: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  mealId: string;
  quantity: number;
  price: number;
  meal: Meal;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  address: string;
  createdAt: string;
  items: OrderItem[];
}

const MyOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const user = useAuth();
  console.log("I am from order page", user?.data?.user?.id);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Using standard fetch - Next.js client components
        // handle this similarly to standard React
        const res = await fetch(`${backendUrl}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials 'include' is important if you use cookies/sessions
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data?.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl]);

  if (loading) return <div className="p-4">Loading your orders...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id} className="text-center">
              {/* FIXED: Link must be inside a td */}
              <td className="p-2 border">
                <Link
                  className="underline text-blue-600 hover:text-green-500"
                  href={`/dashboard/orders/${order.id}`}
                >
                  {order.id}
                </Link>
              </td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">${order.totalPrice}</td>
              <td className="p-2 border">{order.address}</td>

              <td className="p-2 border">
                {order.items?.map((item: OrderItem) => (
                  <div key={item.id} className="text-xs">
                    Meal: {item.mealId} | Qty: {item.quantity} | ${item.price}
                  </div>
                ))}
              </td>

              <td className="p-2 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
