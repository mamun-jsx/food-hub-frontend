"use client";

import React, { useState } from "react";
import { fetchMyProfile } from "../../../../../service/user-api-endpoint";
import UpdateProfileForm from "@/components/modules/Form/UpdateProfileForm";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import { Mail, Shield, Edit3, Users, ClipboardList, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const AdminDashboard = () => {
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
          <h1 className="text-3xl font-black text-gray-900">Admin Control Center</h1>
          <p className="text-gray-500">Manage platform users, providers, and global activity.</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <span className="text-xs font-black text-primary uppercase tracking-widest">Administrator</span>
        </div>
      </header>

      {/* ADMIN INFO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={profile?.image || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                  alt={profile?.name || "Admin"}
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
                  <span className="text-sm font-bold uppercase tracking-wider">{profile?.role} Access</span>
                </div>
              </div>
            </div>
          </div>

          {showEdit && (
            <div className="mt-10 pt-8 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
               <h3 className="text-lg font-bold mb-6">Update Profile Information</h3>
               <UpdateProfileForm />
            </div>
          )}
        </div>

        {/* PLATFORM STATS */}
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
                 <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Total Users</p>
                <h4 className="text-2xl font-black text-gray-900">1,240</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                 <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Providers</p>
                <h4 className="text-2xl font-black text-gray-900">86</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-2xl text-amber-500">
                 <ClipboardList size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Global Orders</p>
                <h4 className="text-2xl font-black text-gray-900">3,420</h4>
              </div>
           </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-xl font-black mb-8 text-gray-900">Platform Management</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/users"
            className="bg-primary text-white px-10 py-4 rounded-2xl hover:bg-primary-hover transition-all font-bold shadow-lg shadow-primary/20"
          >
            Manage Users
          </Link>
          <Link
            href="/dashboard/orders"
            className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all font-bold"
          >
            Global Orders
          </Link>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="text-xl font-black mb-8 text-gray-900">Recent Platform Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1234, 1235, 1236].map((id) => (
                <tr key={id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 text-sm font-bold text-gray-500">#{id}</td>
                  <td className="py-5 text-sm font-black text-gray-900">Customer Name</td>
                  <td className="py-5 text-sm font-bold text-gray-900">120.00 TK</td>
                  <td className="py-5">
                    <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
