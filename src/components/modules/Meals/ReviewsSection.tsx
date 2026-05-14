"use client";

import React from "react";
import { IReview } from "@/types/meal.Type";

interface ReviewsSectionProps {
  initialReviews: IReview[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  return (
    <div className="w-10/12 mx-auto my-12 border-t pt-10">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">
        Customer Reviews ({initialReviews.length})
      </h3>

      {initialReviews.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed">
          <p className="text-gray-500 font-medium">
            No reviews yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {initialReviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {rev.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none mb-1">
                      {rev.user.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      {new Date(rev.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  <span className="text-orange-700 font-bold text-sm">
                    ★ {rev.rating}/5
                  </span>
                </div>
              </div>
              <div className="mt-4 pl-16">
                <p className="text-gray-700 leading-relaxed italic text-sm md:text-base">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
