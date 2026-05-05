import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShoppingBasket,
  Calendar,
  Clock,
  UtensilsCrossed,
  Sparkles,
  ChefHat,
  Leaf,
} from "lucide-react";
import shefImage from "@/assets/shef.webp";

const features = [
  {
    icon: <ShoppingBasket className="w-6 h-6" />,
    title: "Online Order",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Pre-Reservation",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Service",
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: "Organized Foodie Place",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Clean Kitchen",
  },
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Super Chefs",
  },
];

export default function Staff() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Creative Circular Composition */}
        <div className="relative aspect-square w-full flex items-center justify-center order-2 lg:order-1">
          {/* Large Central Circle */}
          <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10">
            <Image
              src={shefImage}
              alt="Professional Chef"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Floating Spices/Greens (Decorative placeholders using patterns/colors since local assets are limited) */}
          <div className="absolute top-[5%] right-[5%] w-1/4 h-1/4 rounded-full overflow-hidden border-4 border-white shadow-lg z-20 bg-primary/20 flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&auto=format&fit=crop&q=60"
              alt="Fresh Spices"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-[10%] left-[0%] w-1/5 h-1/5 rounded-full overflow-hidden border-4 border-white shadow-lg z-20 bg-green-100 flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60"
              alt="Fresh Greens"
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative Floating Element */}
          <div className="absolute top-[15%] left-[10%] p-4 bg-white rounded-full shadow-xl z-20 hidden md:block animate-bounce">
            <Leaf className="text-primary w-8 h-8" />
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full scale-110"></div>
          <div className="absolute inset-0 border-[1px] border-primary/10 rounded-full scale-125"></div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col gap-8 order-1 lg:order-2">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We Are More Than <br />
              <span className="text-primary italic">Multiple Service</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              At FoodHub, we believe dining is an immersive journey of the
              senses. Our philosophy centers on the harmony of traditional
              artisanal techniques and modern innovation, sourcing only the
              finest ingredients to craft moments that linger long after the
              last bite.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-800">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button className="bg-primary cursor-pointer hover:bg-primary-hover text-white px-10 py-7 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
