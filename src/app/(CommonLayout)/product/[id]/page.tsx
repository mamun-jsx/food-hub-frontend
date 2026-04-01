import React from "react";
import { fetchProductById } from "../../../../../service/user-api-endpoint";
import { IMeal, IReview } from "@/types/meal.Type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/modules/UserAction/AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>; // In Next 15, params is a Promise
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const response = await fetchProductById(id);
  const meal: IMeal = response.data;

  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Menu</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Image Container */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
            <Badge className="absolute top-4 left-4 text-md px-4 py-1 bg-white/90 text-black hover:bg-white">
              {meal.category}
            </Badge>
          </div>

          {/* Right Side: Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
                {meal.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={18} fill="currentColor" />
                  <span>{meal.reviews.length > 0 ? "4.5" : "No ratings"}</span>
                </div>
                <span className="text-muted-foreground">
                  ({meal.reviews.length} Reviews)
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={16} />
                  <span>20-30 min</span>
                </div>
              </div>
            </div>

            <div className="border-y py-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {meal.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Price
                </p>
                <h2 className="text-3xl font-bold text-green-600">
                  {meal.price} <span className="text-lg">TK</span>
                </h2>
              </div>

              
                  <AddToCartButton meal={meal} />
            </div>

            {/* Provider/Seller Info Placeholder */}
            <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Provider ID
              </p>
              <p className="text-sm font-mono text-slate-500 mb-3">
                {meal?.providerId}
              </p>
              <Link
                href={`/provider/${meal?.providerId}`}
                className="px-2 py-1 border border-green-500 rounded hover:cursor-pointer hover:bg-green-400 hover:text-white hover:border-black"
              >
                provider&apos;s Items
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* review section  */}

      <div className="w-10/12 mx-auto my-12 border-t pt-10">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          Customer Reviews ({meal?.reviews?.length || 0})
        </h3>

        {meal?.reviews?.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed">
            <p className="text-gray-500 font-medium">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {meal.reviews.map((rev: IReview, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: User Info */}
                  <div className="flex items-center gap-4">
                    {/* Custom Initial Avatar (Safe if image is null) */}
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

                  {/* Right: Rating Number */}
                  <div className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    <span className="text-orange-700 font-bold text-sm">
                      ★ {rev.rating}/5
                    </span>
                  </div>
                </div>

                {/* Comment Body */}
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
    </section>
  );
};

export default ProductDetailsPage;
