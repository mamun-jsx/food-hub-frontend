import axiosApi from "@/lib/axiosInstance";

// get all users

export const fetchAllUsers = async () => {
  const response = await axiosApi.get("/api/admin/users");
  return response.data;
};

// get all orders

export const fetchAllOrders = async () => {
  const response = await axiosApi.get("/api/admin/orders");
  return response.data;
};

// update a user

export const updateUserRole = async (id: string, role: string) => {
  const response = await axiosApi.patch(`/api/admin/orders/${id}`, { role });
  return response.data;
};