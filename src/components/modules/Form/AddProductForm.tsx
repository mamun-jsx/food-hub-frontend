"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export function AddProductForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    cookTime: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", form);
    // Here you can send form data to your backend API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

      {/* Product Name */}
      <Field>
        <FieldLabel htmlFor="name">Product Name</FieldLabel>
        <Input
          id="name"
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </Field>

      {/* Product Category */}
      <Field>
        <FieldLabel htmlFor="category">Product Category</FieldLabel>
        <Input
          id="category"
          name="category"
          placeholder="Enter product category"
          value={form.category}
          onChange={handleChange}
          required
        />
      </Field>

      {/* Product Description */}
      <Field>
        <FieldLabel htmlFor="description">Product Description</FieldLabel>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </Field>

      {/* Estimated Cook Time */}
      <Field>
        <FieldLabel htmlFor="cookTime">
          Estimated Cook Time (minutes)
        </FieldLabel>
        <Input
          id="cookTime"
          name="cookTime"
          type="number"
          placeholder="e.g. 30"
          value={form.cookTime}
          onChange={handleChange}
          required
        />
        <FieldDescription>
          Time in minutes to cook this product.
        </FieldDescription>
      </Field>

      {/* Product Price */}
      <Field>
        <FieldLabel htmlFor="price">Product Price</FieldLabel>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Enter product price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </Field>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}
