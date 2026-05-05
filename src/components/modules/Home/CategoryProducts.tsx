"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMeal } from "@/types/meal.Type";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const categories = [
  "all",
  "pasta",
  "pizza",
  "burger",
  "chawmin",
  "local food",
  "biryani",
];

export default function CategoryProducts() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<IMeal[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IMeal[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          const mealList = data?.meal || [];
          setProducts(mealList);
          setFilteredProducts(mealList.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products.slice(0, 4));
    } else {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredProducts(filtered.slice(0, 4));
    }
  }, [activeCategory, products]);

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" id="category-dishes">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore By Category
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            let avgRating = 0;
            if (item.reviews && item.reviews.length > 0) {
              const total = item.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              avgRating = Math.round(total / item.reviews.length);
            }

            return (
              <article
                key={item.id}
                onClick={() => router.push(`/meals/${item.id}`)}
                className="bg-white rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] shadow-sm h-full border border-gray-100 cursor-pointer"
              >
                <div className="mb-6 w-full flex justify-center relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm capitalize">
                    {item.category}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1 w-full">
                  {item.name}
                </h3>

                <div className="flex text-primary mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < avgRating ? "text-primary" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 w-full px-2">
                  {item.description}
                </p>

                <div className="flex w-full justify-center gap-4 text-xs font-medium text-gray-500 mb-6 bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{item.cookingTime || 0} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-primary" />
                    <span>{item.deliveryTime || 0} min</span>
                  </div>
                </div>

                <div className="mt-auto flex w-full justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-900">
                    {item.price.toFixed(2)} TK
                  </span>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                      });
                    }}
                    className="rounded-full border cursor-pointer border-primary text-xs font-semibold text-gray-900 hover:bg-primary hover:text-white transition-colors h-9 px-4"
                  >
                    Add To Cart
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}

        <div className="flex justify-center mt-12">
            <Button 
                onClick={() => router.push('/meals')}
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary-hover text-white font-bold"
            >
                View All Products
            </Button>
        </div>
      </div>
    </section>
  );
}
