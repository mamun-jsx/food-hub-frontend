"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllProvider } from "../../../../service/user-api-endpoint";
import ProviderCard from "@/components/shared/ProviderCard";
import ProviderCardSkeleton from "@/components/shared/skeletons/ProviderCardSkeleton";

interface User {
  name: string;
  email: string;
  image?: string;
}

interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
  user: User;
}

const Providers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => fetchAllProvider(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFCF7] px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center md:text-left">
            <div className="h-12 w-64 bg-gray-200 animate-pulse rounded-lg mb-4 mx-auto md:mx-0"></div>
            <div className="h-6 w-full max-w-xl bg-gray-200 animate-pulse rounded-lg mx-auto md:mx-0"></div>
          </header>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <ProviderCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const allProviders = data?.provider || [];

  return (
    <div className="min-h-screen bg-[#FFFCF7] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Our Culinary Partners
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Discover the best local kitchens and chefs bringing delicious meals straight to your door.
          </p>
        </header>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProviders.map((p: Provider) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Providers;
