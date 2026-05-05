"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  CalendarDays,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import dinnerImage from "@/assets/dinnerPlan.png";

export default function DinnerPlan() {
  return (
    <section className="py-24 bg-[#fbf9f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero Reservation Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-24">
          {/* Left Content: Typography and Action */}
          <div className="flex-1 space-y-8 order-2 md:order-1 text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
              <Star className="w-4 h-4 mr-2 fill-current" />
              <span className="font-bold text-sm uppercase tracking-wide">
                Premier Dining Experience
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight max-w-xl leading-[1.1]">
              Do You Have Any Dinner Plan Today? Order A Item From Here.
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Make online reservations, read restaurant reviews from diners, and
              earn points towards free meals. FoodHub is a real-time online
              reservation system.
            </p>
            <div className="pt-4">
              <Button className="bg-primary cursor-pointer hover:bg-primary-hover text-white font-bold text-lg px-12 cursor-pointer py-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3">
                <span></span>
                View Our Meals
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt="Customer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-gray-600">
                <p className="text-sm font-medium">
                  <span className="text-primary font-bold">500+</span> Orders
                  Delivered Every Hours
                </p>
              </div>
            </div>
          </div>

          {/* Right Content: The Hero Image */}
          <div className="flex-1 order-1 md:order-2 flex justify-center items-center relative">
            {/* Abstract Decorative Elements */}
            <div className="absolute -z-10 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl opacity-60"></div>
            <div className="relative w-full max-w-[500px] aspect-square rounded-full overflow-hidden border-[16px] border-white shadow-2xl">
              <Image
                src={dinnerImage}
                alt="Dinner Dish"
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 md:left-0 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Chef&apos;s Special</p>
                <p className="text-xs text-gray-500">Mediterranean Roast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 p-8 rounded-3xl border border-gray-100 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
            <CalendarDays className="text-primary w-10 h-10" />
            <h3 className="font-bold text-xl text-gray-900">
              Instant Confirmation
            </h3>
            <p className="text-gray-600">
              Get your table secured immediately with our real-time
              synchronization system.
            </p>
          </div>
          <div className="bg-white/60 p-8 rounded-3xl border border-gray-100 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
            <MessageSquareText className="text-primary w-10 h-10" />
            <h3 className="font-bold text-xl text-gray-900">
              Verified Reviews
            </h3>
            <p className="text-gray-600">
              Read authentic feedback from our community of food enthusiasts and
              critics.
            </p>
          </div>
          <div className="bg-white/60 p-8 rounded-3xl border border-gray-100 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
            <ShieldCheck className="text-primary w-10 h-10" />
            <h3 className="font-bold text-xl text-gray-900">Earn Rewards</h3>
            <p className="text-gray-600">
              Collect points with every booking and unlock exclusive culinary
              experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
