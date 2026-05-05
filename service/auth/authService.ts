import axiosApi from "@/lib/axiosInstance";

export const registerUser = async (userData: any) => {
  try {
    const response = await axiosApi.post("/api/auth/register", userData);
    if (response.data.success && response.data.token) {
      setTokenCookie(response.data.token);
    }
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await axiosApi.post("/api/auth/login", credentials);
    if (response.data.success && response.data.token) {
      setTokenCookie(response.data.token);
    }
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const logoutUser = async () => {
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  try {
    await axiosApi.post("/api/auth/logout");
  } catch (error) {
    console.error("Logout error", error);
  }
  return { success: true };
};

const setTokenCookie = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=604800; samesite=strict`;
};

export const getSession = () => {
  if (typeof window === "undefined") return null;
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]!));
    return { user: payload };
  } catch (e) {
    return null;
  }
};
