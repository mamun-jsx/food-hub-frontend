"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axiosApi from "@/lib/axiosInstance";
import { addMealByProvider } from "../../../../service/provider-apiEndPoint";

export function AddProductForm() {
  const [form, setForm] = useState({
    name: "",
    category: "Pasta",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      image: form.image || undefined,
    };

    console.log("PAYLOAD:", payload);

    if (
      !payload.name ||
      !payload.description ||
      !payload.category ||
      !payload.price
    ) {
      alert("Fill all required fields");
      return;
    }

    if (isNaN(payload.price)) {
      alert("Invalid price");
      return;
    }

    try {
      const res = await addMealByProvider(payload);
      console.log("SUCCESS:", res);
      if (res.success) {
        setForm({
          name: "",
          category: "Pasta",
          description: "",
          price: "",
          image: "",
        });
        alert("Data is saved");
      }
    } catch (err) {
      console.log("ERROR RESPONSE:", err.response?.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Add Meal</h2>

      {/* NAME */}
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </Field>

      {/* CATEGORY */}
      <Field>
        <FieldLabel>Category</FieldLabel>
        <select
          name="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="Pasta">Pasta</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Chawmin">Chawmin</option>
          <option value="Local Food">Local Food</option>
          <option value="Biryani">Biryani</option>
        </select>
      </Field>

      {/* DESCRIPTION */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </Field>

      {/* IMAGE */}
      <Field>
        <FieldLabel>Image URL</FieldLabel>
        <Input name="image" value={form.image} onChange={handleChange} />
      </Field>

      {/* PRICE */}
      <Field>
        <FieldLabel>Price</FieldLabel>
        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
      </Field>

      {/* SUBMIT */}
      <Button type="submit" className="w-full">
        Add Meal
      </Button>
    </form>
  );
}
