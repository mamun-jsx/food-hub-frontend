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
import MealCard from "@/components/shared/MealCard";
import Loader from "@/components/shared/Loader";

import { useQuery } from "@tanstack/react-query";
import { fetchMeal } from "../../../../service/user-api-endpoint";

export default function FeaturesProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: () => fetchMeal(),
  });

  const products = data?.meal || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-[#fbf9f5] flex justify-center items-center">
        <Loader />
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
              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <MealCard item={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
