import { cookies } from "next/headers";

export const fetchAllOrdersServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized: No session token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("Unauthorized: Admin access required");
    }
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
};
