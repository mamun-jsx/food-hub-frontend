"use client";

import { useEffect, useState } from "react";
import {
  fetchProvidersMeal,
  deleteMealByProvider,
  updateMealByProvider,
} from "../../../../../../service/provider-apiEndPoint";

type Meal = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

const categories = ["Pasta", "Pizza", "Burger", "Biryani"];

const ProviderMealsView = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // edit state
  const [editMeal, setEditMeal] = useState<Meal | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  });

  // =========================
  // LOAD / REFRESH MEALS
  // =========================
  const loadMeals = async () => {
    try {
      setLoading(true);
      const data = await fetchProvidersMeal();
      setMeals(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  // =========================
  // DELETE + REFRESH
  // =========================
  const handleDelete = async (id: string) => {
    try {
      await deleteMealByProvider(id);
      await loadMeals(); // 🔥 refetch after delete
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openEdit = (meal: Meal) => {
    setEditMeal(meal);
    setFormData({
      name: meal.name,
      category: meal.category,
      price: meal.price,
      description: meal.description,
    });
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // UPDATE + REFRESH (IMPORTANT)
  // =========================
  const handleUpdate = async () => {
    if (!editMeal) return;

    try {
      await updateMealByProvider(editMeal.id, formData);

      setEditMeal(null);

      await loadMeals(); // 🔥 MUST refetch after update
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Provider Meals</h2>

      {/* ================= TABLE ================= */}
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
          {meals?.meals?.map((meal) => (
            <tr key={meal.id}>
              <td className="p-2 border">
                <img src={meal.image} className="w-16 h-16 object-cover" />
              </td>

              <td className="p-2 border">{meal.name}</td>
              <td className="p-2 border">{meal.category}</td>
              <td className="p-2 border">{meal.price}</td>

              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEdit(meal)}
                  className="px-2 py-1 bg-blue-500 text-white"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal.id)}
                  className="px-2 py-1 bg-red-500 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= EDIT MODAL ================= */}
      {editMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 w-[420px] rounded">
            <h2 className="text-lg font-bold mb-3">Update Meal</h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Name"
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Price"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Description"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditMeal(null)}
                className="px-3 py-1 bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderMealsView;