import axiosApi from "@/lib/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

export const fetchAllUsers = async () => {
  const response = await fetch(`${API_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies for authentication
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// update a user

export const updateUserRole = async (id: string, role: string) => {
  const response = await axiosApi.patch(`/api/admin/users/${id}`, { role });
  return response.data;
};
