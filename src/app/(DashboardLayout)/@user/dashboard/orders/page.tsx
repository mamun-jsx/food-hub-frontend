"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Loader from "@/components/shared/Loader";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAllOrderForUser } from "../../../../../../service/user-api-endpoint";
import { useQuery } from "@tanstack/react-query";

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
  status: "PENDING" | "DELIVERED" | "CANCELLED" | string;
  totalPrice: number;
  address: string;
  createdAt: string;
  items: OrderItem[];
}

const MyOrder = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => fetchAllOrderForUser(),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;
  
  if (isError) return (
    <div className="p-10 text-center bg-red-50 rounded-3xl border border-red-100 m-6">
      <p className="text-red-500 font-bold text-lg">Error: {error instanceof Error ? error.message : "Failed to fetch orders"}</p>
      <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">Try Again</Button>
    </div>
  );

  const orders: Order[] = data?.data || [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-500">Track and manage your culinary adventures</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-5 px-6 font-bold text-gray-700">Order ID</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Status</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Address</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Total Price</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Date</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-gray-400">
                  You haven&apos;t placed any orders yet.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="group hover:bg-gray-50/50 transition-colors border-gray-50">
                  <TableCell className="py-5 px-6">
                    <span className="font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</span>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-full px-3 py-1 font-bold ${
                        order.status === "DELIVERED" 
                        ? "bg-primary/20 text-primary border-primary/30" 
                        : order.status === "PENDING"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-red-50 text-red-600 border-red-100"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 px-6 max-w-[200px]">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex items-center gap-1.5 font-black text-gray-900">
                      <CreditCard size={14} className="text-gray-400" />
                      {order.totalPrice} TK
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Clock size={14} className="text-gray-300" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-right">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary/10 hover:text-primary gap-2">
                        <Eye size={16} /> Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyOrder;