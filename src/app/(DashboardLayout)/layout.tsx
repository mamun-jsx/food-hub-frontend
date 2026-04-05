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

  console.log("Dashboard Session:", session); // Debug
  console.log("Role:", session?.user?.role); // Debug

  if (isPending) return <p>Loading...</p>;
  if (!session) {
    return <p>Unauthorized - No session found</p>;
  }

  const role = session?.user?.role;

  // Debug: show what we have
  if (!role) {
    return (
      <div>
        <p>Error: User role not found</p>
        <p>Session Data: {JSON.stringify(session)}</p>
      </div>
    );
  }

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
