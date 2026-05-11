"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  createProviderProfile,
  updateProviderProfileData,
  fetchProviderProfile,
} from "../../../../../service/provider-apiEndPoint";
import { fetchMyProfile } from "../../../../../service/user-api-endpoint";
import UpdateProfileForm from "@/components/modules/Form/UpdateProfileForm";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import { Store, Mail, Shield, Utensils, Edit3 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ProviderDashboard = () => {
  const queryClient = useQueryClient();
  const [restaurantForm, setRestaurantForm] = useState({
    restaurantName: "",
    description: "",
    address: "",
    phone: "",
  });

  const [showUserEdit, setShowUserEdit] = useState(false);

  const { data: providerRes, isLoading: isProviderLoading } = useQuery({
    queryKey: ["provider-profile"],
    queryFn: () => fetchProviderProfile(),
  });

  const { data: userRes, isLoading: isUserLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile(),
  });

  useEffect(() => {
    if (providerRes?.success && providerRes?.profile) {
      setRestaurantForm({
        restaurantName: providerRes.profile.restaurantName || "",
        description: providerRes.profile.description || "",
        address: providerRes.profile.address || "",
        phone: providerRes.profile.phone || "",
      });
    }
  }, [providerRes]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createProviderProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-profile"] });
      toast.success("Profile Created ✅");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Create failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProviderProfileData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-profile"] });
      toast.success("Restaurant updated ✅");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRestaurantForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRestaurantAction = () => {
    if (providerRes?.profile) {
      updateMutation.mutate(restaurantForm);
    } else {
      createMutation.mutate(restaurantForm);
    }
  };

  if (isProviderLoading || isUserLoading) return <div className="flex justify-center py-20"><Loader /></div>;

  const userProfile = userRes?.data;
  const hasRestaurantProfile = !!providerRes?.profile;

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-500">Manage your culinary brand and personal identity.</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <span className="text-xs font-black text-primary uppercase tracking-widest">Verified Merchant</span>
        </div>
      </header>

      {/* USER & RESTAURANT INFO GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* PERSONAL PROFILE SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
          <h2 className="text-xl font-bold mb-8 text-gray-900 flex items-center gap-3">
             <Shield className="text-primary" size={20} /> Personal Profile
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-50">
                <Image
                  src={userProfile?.image || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                  alt={userProfile?.name || "Provider"}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <button 
                onClick={() => setShowUserEdit(!showUserEdit)}
                className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform"
              >
                <Edit3 size={14} />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-black text-gray-900 mb-2">{userProfile?.name}</h3>
              <div className="flex flex-col gap-1.5 text-gray-500">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <Mail size={14} className="text-primary" />
                  <span>{userProfile?.email}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Merchant Account</p>
              </div>
            </div>
          </div>

          {showUserEdit && (
            <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
               <UpdateProfileForm />
            </div>
          )}
        </div>

        {/* RESTAURANT PROFILE SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-8 text-gray-900 flex items-center gap-3">
             <Store className="text-primary" size={20} /> Restaurant Identity
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Restaurant Name</label>
                <input
                  name="restaurantName"
                  placeholder="e.g. Gourmet Kitchen"
                  value={restaurantForm.restaurantName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Business Phone</label>
                <input
                  name="phone"
                  placeholder="+880 1XXX XXXXXX"
                  value={restaurantForm.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Store Address</label>
              <input
                name="address"
                placeholder="Full operational address"
                value={restaurantForm.address}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Description</label>
              <textarea
                name="description"
                placeholder="Share your kitchen's story..."
                value={restaurantForm.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                rows={3}
              />
            </div>

            <button
              onClick={handleRestaurantAction}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full bg-gray-900 hover:bg-primary text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4"
            >
              {createMutation.isPending || updateMutation.isPending 
                ? "Processing..." 
                : hasRestaurantProfile ? "Update Business Details" : "Launch Restaurant Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Sales", val: "1.2k TK", icon: Utensils, color: "text-primary" },
           { label: "Active Items", val: "24", icon: Store, color: "text-blue-500" },
           { label: "New Orders", val: "08", icon: Mail, color: "text-amber-500" },
           { label: "Rating", val: "4.8", icon: Shield, color: "text-emerald-500" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 hover:scale-105 transition-transform duration-300">
              <div className={`${stat.color.replace('text', 'bg')}/10 p-3 rounded-2xl ${stat.color}`}>
                 <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                <h4 className="text-xl font-black text-gray-900">{stat.val}</h4>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ProviderDashboard;
