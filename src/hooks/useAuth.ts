"use client";

import { AuthSession } from "@/types/auth.Type";
import { authClient } from "../../service/auth/auth";

export const useAuth = () => {
  return authClient.useSession() as {
    data: AuthSession | null;
    isPending: boolean;
  };
};

