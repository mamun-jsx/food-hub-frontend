"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { IMealForm, categorys } from "@/types/form.Types";
import MealCard from "@/components/shared/MealCard";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { deleteMealByProvider, getMealByProvider, updateMealByProvider } from "../../../../../../service/provider-apiEndPoint";

interface Meal {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  cookingTime?: number;
  deliveryTime?: number;
}

const ProviderMealsView = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMeal, setEditMeal] = useState<Meal | null>(null);

  const [formData, setFormData] = useState<IMealForm>({
    name: "",
    category: categorys.PASTA,
    price: 0,
    description: "",
    image: "",
    cookingTime: 0,
    deliveryTime: 0,
  });

  const categories = Object.values(categorys);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const res = await getMealByProvider();
      setMeals(res?.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;
    const toastId = toast.loading("Deleting meal...");
    try {
      await deleteMealByProvider(id);
      setMeals((prev) => prev.filter((m) => m.id !== id));
      toast.success("Meal deleted successfully", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete meal", { id: toastId });
    }
  };

  const openEdit = (meal: Meal) => {
    setEditMeal(meal);
    setFormData({
      name: meal.name,
      category: meal.category as categorys,
      price: meal.price,
      description: meal.description,
      image: meal.image,
      cookingTime: meal.cookingTime || 0,
      deliveryTime: meal.deliveryTime || 0,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "cookingTime" || name === "deliveryTime"
          ? Number(value)
          : value,
    }));
  };

  const handleUpdate = async () => {
    if (!editMeal) return;
    const toastId = toast.loading("Updating meal...");
    try {
      const res = await updateMealByProvider(editMeal.id, formData);
      if (res.success) {
        // Optimistic update
        setMeals((prev) =>
          prev.map((m) => (m.id === editMeal.id ? { ...m, ...formData } : m)),
        );
        setEditMeal(null);
        toast.success("Meal updated successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update meal", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Your Menu</h1>
          <p className="text-gray-500">
            Manage and update your delicious offerings
          </p>
        </div>
        <Button
          asChild
          className="rounded-full px-6 bg-primary hover:bg-primary-hover"
        >
          <a href="/dashboard">
            <Plus className="mr-2 w-4 h-4" /> Add New Dish
          </a>
        </Button>
      </header>

      {meals.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            No meals found in your menu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <MealCard key={meal.id} item={meal as any}>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(meal)}
                  className="rounded-full h-8 w-8 p-0 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(meal.id)}
                  className="rounded-full h-8 w-8 p-0 border-red-200 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </MealCard>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {editMeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 w-full max-w-md rounded-[2rem] shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black mb-6 text-gray-900">
              Update Dish
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Dish Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Price (TK)
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 text-gray-400">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Cooking (Min)
                  </label>
                  <input
                    name="cookingTime"
                    type="number"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Delivery (Min)
                  </label>
                  <input
                    name="deliveryTime"
                    type="number"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="ghost"
                onClick={() => setEditMeal(null)}
                className="flex-1 rounded-xl h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                className="flex-1 bg-primary hover:bg-primary-hover text-white rounded-xl h-12 font-bold"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderMealsView;
