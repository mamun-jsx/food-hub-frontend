"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../../../service/user-api-endpoint";
import { IProfileUpdateForm } from "@/types/form.Types";

const UpdateProfileForm = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { name?: string; image?: string } = {};
    if (userName) payload.name = userName;
    if (userImage) payload.image = userImage;

    try {
      await updateUserProfile(payload as IProfileUpdateForm);
      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Profile Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all"
      >
        Update Personal Info
      </button>
    </form>
  );
};

export default UpdateProfileForm;
