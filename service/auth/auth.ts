import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js"; 
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(), // MUST be the last plugin to handle production cookies
  ],
});
