"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MealCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 w-full max-w-[320px] mx-auto h-[480px]">
      {/* Image Skeleton */}
      <Skeleton className="mb-6 w-full h-48 rounded-2xl" />

      {/* Title Skeleton */}
      <Skeleton className="h-7 w-3/4 mb-4" />

      {/* Rating Skeleton */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded-full" />
        ))}
      </div>

      {/* Description Skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />

      {/* Timing Info Skeleton */}
      <div className="flex w-full justify-center gap-4 mb-8 bg-gray-50 rounded-lg p-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Footer Skeleton */}
      <div className="mt-auto flex w-full justify-between items-center pt-2">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}
