import axiosApi from "@/lib/axiosInstance";
import { IFormReviewData, IProfileUpdateForm } from "@/types/form.Types";

// get all meals for user
export const fetchMeal = async (search = "", category = "") => {
  const response = await axiosApi.get(`/api/meals?search=${search}&category=${category}`);
  return response.data;
};

// get a single meal as meal details
export const fetchProductById = async (id: string) => {
  const response = await axiosApi.get(`/api/meals/${id}`);
  return response.data;
};

// get provider with product
export const fetchProviderWithProduct = async (id: string) => {
  const response = await axiosApi.get(`/api/providers/${id}`);
  return response.data;
};

// get all providers
export const fetchAllProvider = async () => {
  const response = await axiosApi.get("/api/provider");
  return response.data;
};

// get a single user/provider profile
export const getProfileById = async (id: string) => {
  const response = await axiosApi.get(`/api/get-provider/${id}`);
  return response.data;
};

// get orders for current user
export const fetchAllOrderForUser = async () => {
  const response = await axiosApi.get("/api/orders");
  return response.data;
};

// place order
export const placeOrder = async (orderData: any) => {
  const response = await axiosApi.post("/api/orders", orderData);
  return response.data;
};

// create review
export const createReview = async (reviewData: IFormReviewData) => {
  const response = await axiosApi.post("/api/reviews", reviewData);
  return response.data;
};

// update profile
export const updateUserProfile = async (data: IProfileUpdateForm) => {
  const response = await axiosApi.patch("/api/profile-update", data);
  return response.data;
};
