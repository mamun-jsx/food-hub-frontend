"use client";

import React, { useState } from "react";
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

      {/* Image URL */}
      <input
        type="text"
        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
        value={userImage}
        onChange={(e) => setUserImage(e.target.value)}
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
