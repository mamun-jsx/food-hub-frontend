// api/provider/order

import axiosApi from "@/lib/axiosInstance";

// get all orders of a provider
export const fetchProviderOrders = async () => {
  const response = await axiosApi.get("/api/provider/orders");
  return response.data;
};
// order status change
export const updateOrderStatus = async (id: string, status: string) => {
  const response = await axiosApi.patch(`/api/provider/orders/${id}`, {
    status,
  });
  return response.data;
};

// add meals

export const addMealByProvider = async (data) => {
  const response = await axiosApi.post("/api/provider/meals", data);

  return response.data;
};

// get all meals which Posted by Provider
export const fetchProvidersMeal = async () => {
  const res = await axiosApi.get("/api/provider/meals");
  return res.data;
};
// delete a single meal
export const deleteMealByProvider = async (id: string) => {
  const res = await axiosApi.delete(`/api/provider/meals/${id}`);
  return res.data;
};
type Meal = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: true;
  category: string;
};
// update a product
export const updateMealByProvider = async (id: string, data: Meal) => {
  const res = await axiosApi.put(`/api/provider/meals/${id}`, { data });
  return res.data;
};
