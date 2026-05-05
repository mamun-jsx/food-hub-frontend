import React from "react";
import {
  fetchProviderWithProduct,
  getProfileById,
} from "../../../../../service/user-api-endpoint";
import MealCard from "@/components/shared/MealCard";
import { IMeal } from "@/types/meal.Type";
import { MapPin, Phone, Utensils } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  
  // Parallel fetch for better performance
  const [profileRes, productsRes] = await Promise.allSettled([
    getProfileById(id),
    fetchProviderWithProduct(id),
  ]);

  const providerProfile = profileRes.status === "fulfilled" ? profileRes.value : null;
  const providerProducts = productsRes.status === "fulfilled" ? productsRes.value : null;

  if (!providerProfile || !providerProfile.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider not found</h2>
          <p className="text-gray-500">The requested culinary partner could not be located.</p>
        </div>
      </div>
    );
  }

  const { restaurantName, address, phone, description } = providerProfile.profile;
  const meals = providerProducts?.data || [];
  
  return (
    <div className="min-h-screen bg-[#FFFCF7] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-primary/10 p-2 rounded-xl">
                    <Utensils className="text-primary w-6 h-6" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest text-primary">Top Rated Provider</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                {restaurantName}
              </h1>
              <p className="text-gray-500 text-lg mb-6 max-w-2xl leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-bold">
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  {address}
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={18} className="text-primary" />
                  {phone}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center min-w-[180px]">
              <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-2">Total Dishes</p>
              <p className="text-5xl font-black text-gray-900 leading-none">
                {meals.length}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-10 flex items-center justify-between">
           <h2 className="text-2xl font-black text-gray-900">Explore our Menu</h2>
           <div className="h-px bg-gray-100 flex-1 mx-8 hidden md:block"></div>
           <span className="text-sm font-bold text-gray-400">{meals.length} items available</span>
        </div>

        {meals.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
            <Utensils className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">This provider hasn't added any meals yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {meals.map((product: any) => (
              <MealCard key={product.id} item={product as IMeal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
