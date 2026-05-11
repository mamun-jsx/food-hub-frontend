"use client";

import React from "react";
import {
  fetchProviderOrders,
  updateOrderStatus,
} from "../../../../../../service/provider-apiEndPoint";
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
import { MapPin, CreditCard, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  providerId: string;
  category: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  mealId: string;
  quantity: number;
  price: number;
  meal: IMeal;
}

type Order = {
  id: string;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED" | string;
  totalPrice: number;
  address: string;
  items: IOrderItem[];
  createdAt: string;
};

const OrderStatusList = ["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"];

export default function ProviderViewOrders() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["provider-orders"],
    queryFn: () => fetchProviderOrders(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
      toast.success("Order status updated");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update status");
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;

  const orders: Order[] = data?.data || [];

  const handleStatusChange = (id: string, status: string) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <div className="p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">Manage Orders</h1>
        <p className="text-gray-500">Track incoming orders and update delivery status</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-5 px-6 font-bold text-gray-700">Order & Items</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Price</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Address</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-gray-400">
                  No orders found for your kitchen.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="group hover:bg-gray-50/50 transition-colors border-gray-50">
                  <TableCell className="py-6 px-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-100 text-[10px] font-black px-2 py-0.5 rounded text-gray-500 uppercase tracking-widest">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                <Image 
                                    src={item.meal.image} 
                                    alt={item.meal.name} 
                                    width={40} 
                                    height={40} 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{item.meal.name}</p>
                                <p className="text-[10px] text-gray-400">Qty: {item.quantity} × {item.price} TK</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-6 px-6">
                    <div className="flex items-center gap-1.5 font-black text-gray-900">
                      <CreditCard size={14} className="text-gray-400" />
                      {order.totalPrice} TK
                    </div>
                  </TableCell>

                  <TableCell className="py-6 px-6 max-w-[200px]">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{order.address}</span>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 px-6">
                    <div className="relative inline-block w-full">
                        <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={statusMutation.isPending}
                        className={`appearance-none w-full outline-none rounded-xl px-4 py-2.5 text-xs font-bold border-2 transition-all cursor-pointer ${
                            order.status === "DELIVERED" 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                            : order.status === "CANCELLED"
                            ? "bg-red-50 border-red-100 text-red-600"
                            : "bg-amber-50 border-amber-100 text-amber-600"
                        }`}
                        >
                        {OrderStatusList.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
