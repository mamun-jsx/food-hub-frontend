import { cookies } from "next/headers";

export const fetchAllOrdersServer = async () => {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
