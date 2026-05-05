"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly. 🚀");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-[#FFFCF7] min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <MessageCircle size={14} /> Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            We&apos;re Here to <span className="text-primary italic">Listen</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions about our services or want to partner with us? Our team 
            is ready to help you bring great food to more plates.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { icon: Mail, title: "Email Support", val: "support@foodhub.com", sub: "24/7 dedicated support" },
              { icon: Phone, title: "Phone Line", val: "+1 (555) 000-0000", sub: "Mon - Fri, 9am - 6pm" },
              { icon: MapPin, title: "Global HQ", val: "123 Culinary St, Gourmet City", sub: "GC 12345, United States" },
              { icon: Globe, title: "Social Connect", val: "@foodhub_global", sub: "Follow for live updates" },
            ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary mb-6">
                        <item.icon size={22} />
                    </div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-lg font-black text-gray-900 mb-1">{item.val}</p>
                    <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
                </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[10rem] -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                    Send a Message <div className="h-px bg-gray-100 flex-1"></div>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <Field>
                    <FieldLabel className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Full Name</FieldLabel>
                    <Input required placeholder="Enter your name" className="bg-gray-50 border-none rounded-2xl p-6 h-14 text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                    </Field>
                    <Field>
                    <FieldLabel className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Email Address</FieldLabel>
                    <Input required type="email" placeholder="email@example.com" className="bg-gray-50 border-none rounded-2xl p-6 h-14 text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                    </Field>
                </div>
                
                <Field>
                    <FieldLabel className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Subject</FieldLabel>
                    <Input required placeholder="How can we help you?" className="bg-gray-50 border-none rounded-2xl p-6 h-14 text-sm focus:ring-2 focus:ring-primary/20 transition-all" />
                </Field>
                
                <Field>
                    <FieldLabel className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Message Detail</FieldLabel>
                    <textarea 
                    required
                    className="w-full min-h-[180px] p-6 rounded-2xl border-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Tell us more about your inquiry..."
                    ></textarea>
                </Field>

                <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Send size={20} /> Send Inquiry
                </button>
                </form>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-24 bg-gray-900 rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="bg-white/10 p-4 rounded-3xl text-primary">
                    <Clock size={32} />
                </div>
                <h3 className="text-white text-3xl font-black">Average Response Time: 2 Hours</h3>
                <p className="text-gray-400 max-w-xl mx-auto font-medium">Our support team is working diligently to ensure every inquiry is handled with the care it deserves. We value your time.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
