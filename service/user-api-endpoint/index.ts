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
// get orders
export const fetchAllOrderForUser = async () => {
  const response = await axiosApi.get("/api/provider/orders");
  return response.data;
};

// place an order
export const placeOrderByUser = async (data) => {
  const res = await axiosApi.post(`/api/orders`, { data });
  console.log("response ", res.data);
  return res.data;
};
// fetch order details
export const fetchOrderDetailsByID = async (id: string) => {
  const res = await axiosApi.get(`/api/orders/${id}`);
  return res.data;
};
export const submitReview = async (payload) => {
  const res = await axiosApi.post("/api/reviews", payload);
  return res.data;
};
export const updateUserProfile = async (payload) => {
  const res = await axiosApi.patch("/api/profile-update", payload);
  return res.data;
};
