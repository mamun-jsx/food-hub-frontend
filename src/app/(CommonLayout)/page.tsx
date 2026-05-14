import React, { Suspense } from "react";
import FeaturesProducts from "@/components/modules/Home/FeaturesProducts";
import Hero from "@/components/modules/Home/Hero";
import Staff from "@/components/modules/Home/Staff";
import UserReview from "@/components/modules/Home/UserReview";
import DinnerPlan from "@/components/modules/Home/DinnerPlan";
import CategoryProducts from "@/components/modules/Home/CategoryProducts";
import MealCardSkeleton from "@/components/shared/skeletons/MealCardSkeleton";

const SkeletonGrid = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <MealCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="">
      <Hero />
      
      <Suspense fallback={<SkeletonGrid />}>
        <FeaturesProducts />
      </Suspense>

      <Staff />
      <DinnerPlan />

      <Suspense fallback={<SkeletonGrid />}>
        <CategoryProducts />
      </Suspense>

      <UserReview />
    </div>
  );
}
