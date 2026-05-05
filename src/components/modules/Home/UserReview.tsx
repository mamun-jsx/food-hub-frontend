"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "James Wilson",
    role: "Food Enthusiast",
    review:
      "The seasonal tasting menu was a revelation. Every course felt like a crafted story, blending traditional flavors with a modern artisanal touch that truly defines culinary comfort.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Robert Fox",
    role: "Gourmet Critic",
    review:
      "Rarely do you find a place that balances such a premium atmosphere with genuine warmth. The artisanal sourdough and house-churned butter are worth the visit alone.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Local Foodie",
    review:
      "Culinary Comfort is the perfect name. The ambiance is plush and inviting, and the farm-to-table approach is evident in the freshness of every single ingredient served.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Cody Fisher",
    role: "Chef de Cuisine",
    review:
      "The attention to detail in the presentation and the balance of flavors is exceptional. A true gem for anyone seeking a sophisticated yet soulful dining experience.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Esther Howard",
    role: "Casual Diner",
    review:
      "I was blown away by the service and the quality of the food. It's not just a meal; it's an experience that makes you feel valued and delighted at every turn.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export default function UserReview() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -z-10 top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-[0.2em] mb-4 block text-sm">
                Our Customers Love our food
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                What Our Customer Says?
              </h2>
            </div>
            {/* Navigation Controls */}
            <div className="flex items-center gap-4 relative">
              <CarouselPrevious className="static translate-y-0 w-14 h-14 rounded-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" />
              <CarouselNext className="static translate-y-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-all duration-300 shadow-lg border-none" />
            </div>
          </header>

          <CarouselContent className="-ml-4">
            {reviews.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-white p-2 rounded-[2rem] border-none shadow-[0_15px_40px_-12px_rgba(128,86,8,0.08)] transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-10 flex flex-col justify-between h-full min-h-[380px]">
                    <div className="space-y-6">
                      <div className="flex text-primary">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed italic">
                        &quot;{item.review}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
