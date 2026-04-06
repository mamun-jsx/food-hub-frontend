// api/provider/order

import axiosApi from "@/lib/axiosInstance";
import { IMealForm, IProviderProfile } from "@/types/form.Types";

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

export const addMealByProvider = async (data: IMealForm) => {
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

// update a product
export const updateMealByProvider = async (id: string, data: IMealForm) => {
  const res = await axiosApi.put(`/api/provider/meals/${id}`, data);
  return res.data;
};

// create provider profile
export const createProviderProfile = async (data: IProviderProfile) => {
  const res = await axiosApi.post("/api/provider/profile", data);
  return res.data;
};
export const updateProviderProfileData = async (data: IProviderProfile) => {
  const res = await axiosApi.put("/api/provider/profile", data);
  return res.data;
};
