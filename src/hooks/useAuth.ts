"use client";

import { useEffect, useState } from "react";
import { getSession } from "../../service/auth/authService";

export const useAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const data = getSession();
    setSession(data);
    setIsPending(false);
  }, []);

  return {
    data: session,
    isPending,
  };
};
