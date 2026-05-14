"use client";

import React from "react";
import MealCard from "@/components/shared/MealCard";
import { IMeal } from "@/types/meal.Type";
import { useQuery } from "@tanstack/react-query";
import { fetchMeal } from "../../../../service/user-api-endpoint";
import MealCardSkeleton from "@/components/shared/skeletons/MealCardSkeleton";
import MealsFilters from "@/components/modules/Meals/MealsFilters";
import Pagination from "@/components/shared/Pagination";

export default function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
}) {
  const params = React.use(searchParams);
  const category = params.category === "All" ? "" : params.category || "";
  const search = params.search || "";
  const sortBy = params.sortBy || "name";
  const sortOrder = params.sortOrder || "asc";
  const page = parseInt(params.page || "1");

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

  return (
    <div className="bg-[#fbf9f5] min-h-screen py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Delicious Meals</h1>
          <p className="text-gray-500 text-lg">Browse through our curated selection of top-rated dishes.</p>
        </div>

        <MealsFilters />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        ) : mealLists.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Meals Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {mealLists.map((item: IMeal) => (
                <MealCard key={item.id} item={item} />
              ))}
            </div>
            
            <Pagination totalPages={totalPages} currentPage={page} />
          </>
        )}
      </div>
    </div>
  );
}
