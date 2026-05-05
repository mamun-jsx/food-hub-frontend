"use client";
import DashboardSidebar from "@/components/modules/DashboardComponent/DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function DashboardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data: session, isPending } = useAuth();

  if (isPending) return null; // Very fast, avoid flash
  
  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#FFFCF7]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-500 mb-6">Please log in to access your dashboard.</p>
        <Link href="/login" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-hover transition-all">
          Go to Login
        </Link>
      </div>
    );
  }

  const role = session?.user?.role;
  console.log("Dashboard Session User:", session?.user);

  if (!role) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p>Error: User role not found</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-[1px] bg-gray-200 mx-2" />
          <h1 className="text-sm font-medium text-gray-500 capitalize">
            {role.toLowerCase()} Dashboard
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50/30">
          {role?.toUpperCase() === "ADMIN" && admin}
          {role?.toUpperCase() === "PROVIDER" && provider}
          {role?.toUpperCase() === "USER" && user}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
