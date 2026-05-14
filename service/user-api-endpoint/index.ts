import axiosApi from "@/lib/axiosInstance";
import { IFormReviewData, IProfileUpdateForm } from "@/types/form.Types";

// get all meals for user
export const fetchMeal = async (params: {
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
} = {}) => {
  const { search, category, sortBy, sortOrder, page = 1, limit = 10 } = params;
  const queryParams = new URLSearchParams();
  
  if (search) queryParams.set("search", search);
  if (category && category !== "All") queryParams.set("category", category);
  if (sortBy) queryParams.set("sortBy", sortBy);
  if (sortOrder) queryParams.set("sortOrder", sortOrder);
  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());

  const response = await axiosApi.get(`/api/meals?${queryParams.toString()}`);
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

// get a single order details
export const fetchOrderDetailsByID = async (id: string) => {
  const response = await axiosApi.get(`/api/orders/${id}`);
  return response.data;
};

// place order
export const placeOrder = async (orderData: any) => {
  const response = await axiosApi.post("/api/orders", orderData);
  return response.data;
};

// submit review
export const submitReview = async (reviewData: any) => {
  const response = await axiosApi.post("/api/reviews", reviewData);
  return response.data;
};

// update profile
export const updateUserProfile = async (data: IProfileUpdateForm) => {
  const response = await axiosApi.patch("/api/profile-update", data);
  return response.data;
};
// get current user profile
export const fetchMyProfile = async () => {
  const response = await axiosApi.get("/api/profile");
  return response.data;
};
