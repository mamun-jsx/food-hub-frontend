import React from "react";
import { fetchAllOrdersServer } from "../../../../../../service/admin-apdpoint/server.apis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, CreditCard, ShoppingBag, Calendar } from "lucide-react";
import Image from "next/image";

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

const AdminOrderView = async () => {
  const orderData = await fetchAllOrdersServer();
  const orders = orderData?.data || [];

  return (
    <div className="p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">Platform Orders</h1>
        <p className="text-gray-500">Monitor all transactions and delivery statuses across the platform</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-5 px-6 font-bold text-gray-700">Order ID & Date</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">User</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Items</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Total Price</TableHead>
              <TableHead className="py-5 px-6 font-bold text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-gray-400">
                  No orders have been placed yet.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: Order) => (
                <TableRow key={order.id} className="group hover:bg-gray-50/50 transition-colors border-gray-50">
                  <TableCell className="py-6 px-6">
                    <div className="space-y-1">
                      <p className="font-black text-gray-900 text-sm">#{order.id.slice(-6).toUpperCase()}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                         <Calendar size={12} />
                         {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                         <User size={14} />
                      </div>
                      <span className="text-xs font-bold truncate max-w-[100px]">{order.userId.slice(0, 8)}...</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-6 px-6">
                    <div className="flex -space-x-3 overflow-hidden">
                      {order.items.map((item, idx) => (
                        <div key={item.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-100">
                          <Image 
                            src={item.meal.image} 
                            alt={item.meal.name} 
                            width={32} 
                            height={32} 
                            className="object-cover h-full w-full"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 ring-2 ring-white">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-6 px-6">
                    <div className="flex items-center gap-1.5 font-black text-gray-900">
                      <CreditCard size={14} className="text-gray-400" />
                      {order.totalPrice} TK
                    </div>
                  </TableCell>

                  <TableCell className="py-6 px-6">
                    <Badge 
                      variant="outline" 
                      className={`rounded-full px-4 py-1.5 font-black text-[10px] uppercase tracking-widest ${
                        order.status === "DELIVERED" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {order.status}
                    </Badge>
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

export default AdminOrderView;
