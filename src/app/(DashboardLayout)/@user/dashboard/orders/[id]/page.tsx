"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  fetchOrderDetailsByID,
  submitReview,
} from "../../../../../../../service/user-api-endpoint";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Package, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { IFormReviewData } from "@/types/form.Types";
import Loader from "@/components/shared/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";

// ===============================

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

export interface IOrder {
  id: string;
  userId: string;
  status: "DELIVERED" | "PENDING" | "CANCELLED";
  totalPrice: number;
  address: string;
  createdAt: string;
  items: IOrderItem[];
}

// ===============================
export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [reviewItem, setReviewItem] = useState<IOrderItem | null>(null); 

  const [reviewData, setReviewData] = useState<IFormReviewData>({
    rating: 5,
    comment: "",
  });

  const userData = useAuth();
  const userId = userData?.data?.user?.id;

  const { data: orderRes, isLoading } = useQuery({
    queryKey: ["order-details", id],
    queryFn: () => fetchOrderDetailsByID(id),
  });

  const reviewMutation = useMutation({
    mutationFn: (payload: any) => submitReview(payload),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setReviewItem(null);
      setReviewData({ rating: 5, comment: "" });
    },
    onError: () => {
      toast.error("Failed to submit review");
    },
  });

  const order = orderRes?.data;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: userId,
      mealId: reviewItem?.mealId,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
    };

    if (!payload.userId || !payload.mealId) {
      toast.error("Missing User ID or Meal ID");
      return;
    }

    reviewMutation.mutate(payload);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!order)
    return (
      <div className="p-20 text-center text-gray-500 font-bold">
        Order not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "DELIVERED" ? "bg-primary/20 text-primary" : "bg-primary hover:bg-secondary text-white"}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <MapPin size={18} />{" "}
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-medium">{order.address}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar size={18} />{" "}
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Package size={18} />{" "}
            <div>
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="font-medium text-green-600">
                {order.totalPrice} TK
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-bold mb-4">Items Ordered</h2>
      <div className="space-y-4">
        {order.items.map((item: IOrderItem) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded overflow-hidden">
                  <Image
                    src={item.meal.image}
                    alt={item.meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{item.meal.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} x {item.price} TK
                  </p>
                </div>
              </div>

              {order.status === "DELIVERED" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewItem(item)}
                  className="gap-2"
                >
                  <Star size={14} /> Review Meal
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {reviewItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">
                Review {reviewItem.meal.name}
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    className="w-full border p-2 rounded"
                    value={reviewData.rating}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        rating: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Comment
                  </label>
                  <textarea
                    required
                    className="w-full border p-2 rounded h-24"
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setReviewItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={reviewMutation.isPending}
                    className="flex-1 bg-primary hover:bg-primary-hover"
                  >
                    {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
