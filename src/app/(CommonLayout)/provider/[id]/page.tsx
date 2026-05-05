import React from "react";

import Link from "next/link";
import Image from "next/image";
import {
  fetchProviderWithProduct,
  getProfileById,
} from "../../../../../service/user-api-endpoint";

interface PageProps {
  params: Promise<{ id: string }>;
}
interface providerProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  providerId: string;
  category: string;
  description: string;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const providerProfile = await getProfileById(id);
  const providerProducts = await fetchProviderWithProduct(id as string);

  const { restaurantName, address, phone } = providerProfile.profile;
  console.log(providerProfile, " provider profile id");
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Provider : {restaurantName}
        </h1>
        <p className="text-gray-500">Address: {address}</p>
        <p className="text-gray-500">provider Cell : {phone}</p>
        <p className="text-gray-500">provider id : {id}</p>

        <p className="text-gray-600 mt-1">
          Total Products:{" "}
          <span className="font-semibold text-gray-900">
            {providerProducts?.count}
          </span>
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {providerProducts?.data?.map((product: providerProduct) => (
          <Link key={product.id} href={`/meals/${product?.id}`}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              {/* <p>{product}</p> */}
              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                {/* Category */}
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full w-fit">
                  {product.category}
                </span>

                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product?.description}
                </p>

                {/* Price */}
                <div className="text-lg font-bold text-gray-900">
                  ${product.price}
                </div>

                {/* Provider ID (optional debug/info) */}
                <p className="text-xs text-gray-400 break-all">
                  Provider: {product.providerId}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
