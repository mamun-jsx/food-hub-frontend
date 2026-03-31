"use client";

import React, { useEffect } from "react";
import { authClient } from "../../../../../../service/auth/auth";

const UserOrderView = () => {
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    console.log("Session user:", session);
  }, [session])
  console.log(session)
  return <div>order page</div>;
};

export default UserOrderView;