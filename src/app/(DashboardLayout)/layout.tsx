"use client";
import DashboardSidebar from "@/components/modules/DashboardComponent/DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data: session, isPending } = useAuth();
  if (isPending) return <p>Loading...</p>;
  if (!session) {
    return <p>Unauthorized</p>;
  }
  const role = session?.user?.role;
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 ml-10 md:ml-6 mt-5">
        {role === "ADMIN" && admin}
        {role === "PROVIDER" && provider}
        {role === "CUSTOMER" && customer}
      </main>
    </div>
  );
}
