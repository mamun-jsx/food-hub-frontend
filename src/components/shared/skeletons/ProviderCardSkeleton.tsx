"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProviderCardSkeleton() {
  return (
    <article className="bg-white rounded-[2.5rem] p-8 flex flex-col shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-start mb-6">
        {/* Avatar Skeleton */}
        <Skeleton className="h-16 w-16 rounded-2xl" />
        {/* Verified Badge Skeleton */}
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Restaurant Name Skeleton */}
      <Skeleton className="h-8 w-3/4 mb-3" />
      
      {/* Description Skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-8" />

      {/* Details Box Skeleton */}
      <div className="space-y-4 mb-8 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-auto">
        <Skeleton className="w-full h-14 rounded-2xl" />
      </div>
    </article>
  );
}
