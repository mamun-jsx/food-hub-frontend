import React, { Suspense } from "react";
import MealsFilters from "@/components/modules/Meals/MealsFilters";
import MealsList from "@/components/modules/Meals/MealsList";
import MealCardSkeleton from "@/components/shared/skeletons/MealCardSkeleton";

// This is now a Server Component
export default async function ProductPage({
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
  const params = await searchParams;
  const category = params.category === "All" ? "" : params.category || "";
  const search = params.search || "";
  const sortBy = params.sortBy || "name";
  const sortOrder = params.sortOrder || "asc";
  const pageNum = parseInt(params.page || "1");

  const filterParams = {
    category,
    search,
    sortBy,
    sortOrder,
    page: pageNum,
  };

  return (
    <div className="bg-[#fbf9f5] min-h-screen py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Delicious Meals</h1>
          <p className="text-gray-500 text-lg">Browse through our curated selection of top-rated dishes.</p>
        </div>

        <MealsFilters />

        {/* Using Suspense for the meal list */}
        <Suspense
          key={JSON.stringify(filterParams)}
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <MealCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <MealsList params={filterParams} />
        </Suspense>
      </div>
    </div>
  );
}
