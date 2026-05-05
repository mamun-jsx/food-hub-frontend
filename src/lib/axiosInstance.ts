import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to include the JWT token
axiosApi.interceptors.request.use(
  (config) => {
    // In a real Next.js app, you might want to use cookies for SSR compatibility
    // For now, let's assume the token is stored in a cookie named 'accessToken'
    const token = typeof window !== "undefined" ? document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1] : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosApi;
