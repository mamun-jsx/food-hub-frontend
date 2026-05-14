"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../../../service/user-api-endpoint";
import { IProfileUpdateForm } from "@/types/form.Types";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateProfileFormProps {
  currentName?: string;
  currentImage?: string;
}

const UpdateProfileForm = ({ currentName = "", currentImage = "" }: UpdateProfileFormProps) => {
  const queryClient = useQueryClient();
  const [userName, setUserName] = useState(currentName);
  const [userImage, setUserImage] = useState(currentImage);

  useEffect(() => {
    setUserName(currentName);
    setUserImage(currentImage);
  }, [currentName, currentImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { name?: string; image?: string } = {};
    if (userName) payload.name = userName;
    if (userImage) payload.image = userImage;

    try {
      const res = await updateUserProfile(payload as IProfileUpdateForm);
      if (res.success) {
        toast.success("Profile updated!");
        queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Profile Image URL</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            {userImage && (
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm shrink-0">
                <img
                  src={userImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 hover:bg-primary text-white font-black py-4 rounded-xl shadow-lg shadow-gray-200 transition-all"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateProfileForm;
