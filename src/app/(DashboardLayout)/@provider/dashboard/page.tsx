"use client";

import React, { useEffect, useState } from "react";
import {
  createProviderProfile,
  updateProviderProfileData,
} from "../../../../../service/provider-apiEndPoint";

const Page = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    address: "",
    phone: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // GET PROFILE
  // const fetchProfile = async () => {
  //   try {
  //     const res = await updateProviderProfileData(form);
  //     if (res.data?.providerProfile) {
  //       setForm(res.data.providerProfile);
  //       setIsEdit(true);
  //     }
  //   } catch (err) {
  //     setIsEdit(false);
  //   }
  // };

  // useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  //   fetchProfile();
  // }, []);

  // CREATE
  const handleCreate = async () => {
    try {
      const res = await createProviderProfile(form);
      console.log(res.data);
      alert("Profile Created ✅");
      setIsEdit(true);
    } catch (err: any) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      const res = await updateProviderProfileData(form);
      if (res.success) {
        setForm({
          restaurantName: "",
          description: "",
          address: "",
          phone: "",
        });
        alert("data updated");
        setIsEdit(true);
      }
    } catch (err) {
      setIsEdit(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>
      <h3>You can Create your profile and also update your profile</h3>
      <div className="space-y-3 max-w-md">
        <input
          name="restaurantName"
          placeholder="Restaurant Name"
          value={form.restaurantName}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <div className="flex gap-3">
          <button
            onClick={handleCreate}
            className="bg-green-500 hover:cursor-pointer hover:bg-black  text-white px-4 py-2"
          >
            Create
          </button>

          <button
            onClick={handleUpdate}
            className="bg-black hover:cursor-pointer hover:bg-green-500 text-white px-4 py-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
