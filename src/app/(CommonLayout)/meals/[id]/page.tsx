import React from "react";
import { fetchProductById } from "../../../../../service/user-api-endpoint";
import { IMeal, IReview } from "@/types/meal.Type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Navigation } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/modules/UserAction/AddToCartButton";
import ReviewsSection from "@/components/modules/Meals/ReviewsSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  
  const response = await fetchProductById(id);
  const meal: IMeal = response?.data;

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

            <div className="border-y py-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {meal.description}
                </p>
              </div>
              
              <div className="flex items-center gap-6 pt-2">
                 <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                    <Clock size={16} className="text-primary" />
                    <span className="text-sm font-bold text-gray-700">{meal.cookingTime || 0} min Prep</span>
                 </div>
                 <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                    <Navigation size={16} className="text-primary" />
                    <span className="text-sm font-bold text-gray-700">{meal.deliveryTime || 0} min Delivery</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Price
                </p>
                <h2 className="text-3xl font-bold text-primary">
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
                className="inline-block px-4 py-2 border border-primary text-primary rounded-full hover:cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
              >
                View provider&apos;s Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* review section  */}
      <ReviewsSection initialReviews={meal.reviews} />
    </section>
  );
};

export default ProductDetailsPage;
