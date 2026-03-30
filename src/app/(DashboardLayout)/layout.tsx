"use client";
import DashboardSidebar from "@/components/modules/DashboardComponent/DashboardSidebar";
import { authClient } from "../../../service/auth/auth";
export default function DashboardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();

  const role = session?.user?.role as string;

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 ml-10 md:ml-6 mt-5">
        {role === "ADMIN" ? admin : role === "PROVIDER" ? provider : user}
      </main>
    </div>
  );
}
