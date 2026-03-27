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

