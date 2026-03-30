import axiosApi from "@/lib/axiosInstance";

// get all meals for user
export const fetchMeal = async () => {
  const response = await axiosApi.get("/api/meals");
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

// get a single user
export const getProfileById = async (id: string) => {
  const response = await axiosApi.get(`/api/get-provider/${id}`);
  return response.data;
};
