import axiosApi from "@/lib/axiosInstance";

export const fetchAllUsers = async () => {
  const response = await axiosApi.get("/api/admin/users");
  return response.data;
};

export const updateUserRole = async (id: string, role: string) => {
  const response = await axiosApi.patch(`/api/admin/users/${id}`, { role });
  return response.data;
};

export const fetchAllAdminOrders = async () => {
  const response = await axiosApi.get("/api/admin/orders");
  return response.data;
};
