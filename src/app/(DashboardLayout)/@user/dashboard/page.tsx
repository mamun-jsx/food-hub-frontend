"use client";

import React, { useState } from "react";
import { fetchMyProfile } from "../../../../../service/user-api-endpoint";
import UpdateProfileForm from "@/components/modules/Form/UpdateProfileForm";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import { Mail, Shield, Edit3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  const [showEdit, setShowEdit] = useState(false);

  const { data: profileRes, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile(),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;

  const profile = profileRes?.data;

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">User Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here’s your personal profile and activity.</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <span className="text-xs font-black text-primary uppercase tracking-widest">Active Member</span>
        </div>
      </header>

      {/* USER INFO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={profile?.image || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                  alt={profile?.name || "User"}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <button 
                onClick={() => setShowEdit(!showEdit)}
                className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform"
              >
                <Edit3 size={16} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-gray-900 mb-4">{profile?.name}</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 text-gray-500">
                  <Mail size={16} className="text-primary" />
                  <span className="text-sm font-medium">{profile?.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 text-gray-500">
                  <Shield size={16} className="text-primary" />
                  <span className="text-sm font-bold uppercase tracking-wider">{profile?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {showEdit && (
            <div className="mt-10 pt-8 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
               <h3 className="text-lg font-bold mb-6">Update Profile Information</h3>
               <UpdateProfileForm 
                 currentName={profile?.name} 
                 currentImage={profile?.image} 
               />
            </div>
          )}
        </div>

        {/* QUICK STATS */}
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
              <h4 className="text-3xl font-black text-gray-900">12</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Completed</p>
              <h4 className="text-3xl font-black text-primary">08</h4>
           </div>
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Pending</p>
              <h4 className="text-3xl font-black text-amber-500">04</h4>
           </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-xl font-black mb-8 text-gray-900">Recent Activity</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {i === 3 ? "❌" : "✅"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">Order #123{i} status updated</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
