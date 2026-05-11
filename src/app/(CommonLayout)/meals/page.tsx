"use client";

import React from "react";
import MealCard from "@/components/shared/MealCard";
import { IMeal } from "@/types/meal.Type";
import { useQuery } from "@tanstack/react-query";
import { fetchMeal } from "../../../../service/user-api-endpoint";
import Loader from "@/components/shared/Loader";

export default function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = React.use(searchParams);
  const category = params.category || "";
  const search = params.search || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meals", category, search],
    queryFn: () => fetchMeal(search, category),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-center my-10">Something went wrong</h3>;
  }

  const mealLists: IMeal[] = data?.meal || [];

  if (mealLists.length === 0) {
    return <h3 className="text-center my-10">No Meal Found</h3>;
  }

  return (
    <div className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-11/12 max-w-7xl mx-auto">
      {mealLists.map((item: IMeal) => (
        <MealCard key={item.id} item={item} />
      ))}
    </div>
  );
}
