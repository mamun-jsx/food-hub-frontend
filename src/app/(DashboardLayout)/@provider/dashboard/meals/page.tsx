"use client";

import { useEffect, useState } from "react";
import {
  fetchProvidersMeal,
  deleteMealByProvider,
  updateMealByProvider,
} from "../../../../../../service/provider-apiEndPoint";
import { IMealForm } from "@/types/form.Types";

type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
enum categorys {
  PASTA = "Pasta",
  PIZZA = "Pizza",
  BURGER = "Burger",
  BIRYANI = "Biryani",
}
const categories = ["Pasta", "Pizza", "Burger", "Biryani"];

const ProviderMealsView = () => {
  const [meals, setMeals] = useState<Meal[]>([]); // Assuming the API returns an array
  const [loading, setLoading] = useState(true);
  const [editMeal, setEditMeal] = useState<Meal | null>(null);

  const [formData, setFormData] = useState<IMealForm>({
    name: "",
    category: categorys.PASTA,
    price: 0,
    description: "",
    image: "",
  });

  const loadMeals = async () => {
    try {
      setLoading(true);
      const data = await fetchProvidersMeal();
      // If your API returns { meals: [...] }, use data.meals. Otherwise use data.
      const mealsData = data?.meals || data || [];
      setMeals(mealsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteMealByProvider(id);
      await loadMeals();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (meal: Meal) => {
    setEditMeal(meal);
    setFormData({
      name: meal.name,
      // Cast the string from the API to your Enum type
      category: meal.category as categorys,
      price: meal.price,
      description: meal.description,
      image: meal.image,
       // Ensure image is included if IMealForm requires it
    });
  };

  // FIXED: Handle Number conversion for Price and Select elements
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    if (!editMeal) return;
    try {
      await updateMealByProvider(editMeal.id, formData);
      setEditMeal(null);
      await loadMeals();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Provider Meals</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* FIXED: meals is now typed as an array */}
          {meals.map((meal) => (
            <tr key={meal.id} className="text-center">
              <td className="p-2 border flex justify-center">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border">{meal.name}</td>
              <td className="p-2 border">{meal.category}</td>
              <td className="p-2 border">{meal.price} TK</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEdit(meal)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(meal.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[420px] rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Update Meal</h2>

            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              rows={3}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditMeal(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderMealsView;
