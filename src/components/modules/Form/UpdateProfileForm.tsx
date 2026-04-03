"use client";

import React, { useState } from "react";
import { updateUserProfile } from "../../../../service/user-api-endpoint";

const UpdateProfileForm = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", userName);
    if (userImage) {
      formData.append("image", userImage);
    }

    try {
      await updateUserProfile(formData);
      alert("Profile updated!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Name */}
      <input
        type="text"
        placeholder="Enter name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2 w-full"
      />

      {/* Image */}
      <input
        type="file"
        onChange={(e) => setUserImage(e.target.files?.[0] || null)}
        className="border p-2 w-full"
      />

      {/* Submit */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;
