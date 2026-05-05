"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { IMeal } from "@/types/meal.Type";
import { Clock, Navigation } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function FeaturesProducts() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data?.meal || []);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#fbf9f5] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null; // Don't show the section if there are no products
  }

  return (
    <section className="py-24 bg-[#fbf9f5]" id="popular-dishes">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Dishes
            </h2>
            {/* Navigation Controls */}
            <div className="flex items-center gap-4 relative">
              <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-none" />
              <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full bg-primary text-white hover:opacity-90 transition-opacity flex items-center justify-center border-none shadow-none" />
            </div>
          </header>

          <CarouselContent className="-ml-4">
            {products.map((item) => {
              // Calculate average rating
              let avgRating = 0;
              if (item.reviews && item.reviews.length > 0) {
                const total = item.reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
                );
                avgRating = Math.round(total / item.reviews.length);
              }

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <article
                    onClick={() => router.push(`/meals/${item.id}`)}
                    className="bg-white rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] shadow-sm h-full border border-gray-100 cursor-pointer"
                  >
                    <div className="mb-6 w-full flex justify-center relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm capitalize">
                        {item.category}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1 w-full">
                      {item.name}
                    </h3>
                    
                    {/* Dynamic Rating */}
                    <div className="flex text-primary mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < avgRating ? "text-primary" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 w-full px-2">
                      {item.description}
                    </p>

                    {/* Timing Info */}
                    <div className="flex w-full justify-center gap-4 text-xs font-medium text-gray-500 mb-6 bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{item.cookingTime || 0} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-primary" />
                        <span>{item.deliveryTime || 0} min</span>
                      </div>
                    </div>

                    <div className="mt-auto flex w-full justify-between items-center pt-2">
                      <span className="text-xl font-bold text-gray-900">
                        {item.price.toFixed(2)} TK
                      </span>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          });
                        }}
                        className="rounded-full border cursor-pointer border-primary text-xs font-semibold text-gray-900 hover:bg-primary hover:text-white transition-colors h-9 px-4"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
