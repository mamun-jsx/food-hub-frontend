"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, User as UserIcon } from "lucide-react";

interface ProviderCardProps {
  provider: {
    id: string;
    restaurantName: string;
    description: string;
    address: string;
    phone: string;
    user: {
      name: string;
      email: string;
      image?: string;
    };
  };
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const userAvater =
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_incoming&w=740&q=80";

  return (
    <article className="bg-white rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-inner bg-gray-50 border border-gray-100">
          <Image
            src={provider.user?.image || userAvater}
            alt={provider.user.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified</span>
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2 line-clamp-1">
        {provider.restaurantName}
      </h2>
      
      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
        {provider.description}
      </p>

      <div className="space-y-3 mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
        <div className="flex items-center gap-3 text-gray-600">
          <UserIcon size={14} className="text-primary" />
          <span className="text-xs font-bold">{provider.user.name}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-xs truncate">{provider.address}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Phone size={14} className="text-gray-400" />
          <span className="text-xs">{provider.phone}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link href={`/provider/${provider.id}`} className="block">
          <Button className="w-full rounded-2xl bg-gray-900 py-6 text-sm font-bold hover:bg-primary-hover text-white transition-all shadow-lg hover:shadow-primary/30">
            Explore Menu
          </Button>
        </Link>
      </div>
    </article>
  );
}
