import FAQSection from "@/components/modules/Home/FAQ";
import React from "react";
import Image from "next/image";
import { Utensils, Users, Award, Heart, ShieldCheck, Zap } from "lucide-react";
import OurCulinary from "@/assets/OurCulinary.webp";

const AboutUs = () => {
  return (
    <div className="bg-[#FFFCF7] min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Utensils size={14} /> Our Story
            </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Crafting Culinary <span className="text-primary italic">Connections</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-3xl mx-auto leading-relaxed">
            Founded in 2024, FoodHub began with a simple mission: to bridge the gap between 
            artisanal kitchens and people who appreciate truly great food.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="aspect-square bg-primary/5 rounded-[3rem] overflow-hidden">
                    <Image 
                        src={OurCulinary} 
                        alt="Our Culinary Philosophy" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden lg:block max-w-[280px]">
                    <p className="text-sm font-bold text-gray-900 leading-relaxed italic">
                        "Great food is not just about taste; it's about the soul put into every ingredient."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">A</div>
                        <div>
                            <p className="text-xs font-black text-gray-900">Abdullah Al Mamun</p>
                            <p className="text-[10px] text-gray-400">Founder, FoodHub</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-4xl font-black text-gray-900">Our Culinary <span className="text-primary italic">Philosophy</span></h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    <p>
                        We believe that the best meals are crafted by hands that care. That's why every provider on FoodHub 
                        is hand-vetted for their commitment to quality, sustainability, and authentic culinary creativity.
                    </p>
                    <p>
                        Our platform isn't just about delivery; it's a gallery of local flavors, celebrating the 
                        diverse heritage of our community's kitchens.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-3xl font-black text-primary mb-1">500+</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified Chefs</p>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-3xl font-black text-gray-900 mb-1">12k+</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Foodies</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-gray-900 text-white rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-black mb-4">Values That Drive Us</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Our commitment to excellence is built on three fundamental pillars that guide every decision we make.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { title: "Quality First", desc: "We never compromise on ingredients. Only the freshest, most authentic produce makes it to your plate.", icon: Award },
                    { title: "Local Love", desc: "Supporting local kitchens isn't just a business model; it's our passion for community growth.", icon: Heart },
                    { title: "Pure Speed", desc: "Our delivery network is optimized to ensure your meal arrives exactly as the chef intended.", icon: Zap },
                ].map((v, i) => (
                    <div key={i} className="group p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="bg-primary p-4 rounded-2xl w-max mb-8 shadow-lg shadow-primary/20">
                            <v.icon size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-4">{v.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{v.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <FAQSection />
      </section>
    </div>
  );
};

export default AboutUs;
