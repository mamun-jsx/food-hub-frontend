"use client";

import React from "react";
import MealCard from "@/components/shared/MealCard";
import { IMeal } from "@/types/meal.Type";
import { useQuery } from "@tanstack/react-query";
import { fetchMeal } from "../../../../service/user-api-endpoint";
import MealCardSkeleton from "@/components/shared/skeletons/MealCardSkeleton";
import Pagination from "@/components/shared/Pagination";

interface MealsListProps {
  initialData?: any;
  params: {
    category: string;
    search: string;
    sortBy: string;
    sortOrder: string;
    page: number;
  };
}

export default function MealsList({ initialData, params }: MealsListProps) {
  const { category, search, sortBy, sortOrder, page } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meals", category, search, sortBy, sortOrder, page],
    queryFn: () =>
      fetchMeal({
        category,
        search,
        sortBy,
        sortOrder,
        page,
        limit: 8,
      }),
    initialData,
  });

  if (isError) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  const mealLists: IMeal[] = data?.meal || [];
  const totalPages = data?.totalPages || 1;

  if (!isLoading && mealLists.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Meals Found</h3>
        <p className="text-gray-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading && !data
          ? [...Array(8)].map((_, i) => <MealCardSkeleton key={i} />)
          : mealLists.map((item: IMeal) => <MealCard key={item.id} item={item} />)}
      </div>

      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  );
}
