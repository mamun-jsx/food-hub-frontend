"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

import { addMealByProvider } from "../../../../service/provider-apiEndPoint";
import { IMealForm, categorys } from "@/types/form.Types";

export function AddProductForm() {
  const initialState: IMealForm = {
    name: "",
    category: categorys.PASTA,
    description: "",
    price: 0,
    image: "",
  };

  const [form, setForm] = useState<IMealForm>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price: Number(form.price),
      image: form.image?.trim() || undefined,
    };

    // validation
    if (!payload.name || !payload.description || !payload.price) {
      alert("Please fill all required fields");
      return;
    }

    if (isNaN(payload.price) || payload.price <= 0) {
      alert("Price must be a valid positive number");
      return;
    }

    try {
      const res = await addMealByProvider(payload);

      if (res?.success) {
        alert("Data is saved ✅");
        resetForm(); // clear form after success
      } else {
        alert("Failed to save data");
      }
    } catch (err: any) {
      console.log("ERROR:", err?.response?.data || err.message);
      alert("Something went wrong");
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
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as categorys })
          }
          className="w-full border p-2 rounded"
        >
          {Object.values(categorys).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
      <Button
        type="submit"
        className="w-full hover:bg-green-600 cursor-pointer"
      >
        Add Meal
      </Button>
    </form>
  );
}
