"use client";

import { useEffect, useState, useCallback } from "react";
import { getSession } from "../../service/auth/authService";

export const useAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  const refresh = useCallback(() => {
    const data = getSession();
    setSession(data);
    setIsPending(false);
  }, []);

  useEffect(() => {
    refresh();

    // Listen for storage changes (cross-tab sync)
    window.addEventListener("storage", refresh);
    
    // Custom event for same-tab instant updates
    window.addEventListener("auth-change", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("auth-change", refresh);
    };
  }, [refresh]);

  return {
    data: session,
    isPending,
    refresh,
  };
};
