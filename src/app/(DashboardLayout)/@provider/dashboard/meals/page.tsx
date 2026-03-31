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
  description: true;
  category: string;
};

const ProviderMealsView = () => {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // GET meals
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

  // DELETE meal
  const handleDelete = async (id: string) => {
    try {
      await deleteMealByProvider(id);
      await loadMeals();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE meal (simple example: inline name change)
  const handleUpdate = async (id: string, data: Meal) => {
    console.log(id, " for update meal");
    await updateMealByProvider(id, data);
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
                  onClick={() => handleUpdate(meal.id)}
                  className="px-2 py-1 bg-blue-500 text-white hover:cursor-pointer"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal.id)}
                  className="px-2 py-1 bg-red-500 text-white hover:cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderMealsView;
