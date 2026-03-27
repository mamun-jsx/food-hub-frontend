import DashboardSidebar from "@/components/modules/DashboardComponent/DashboardSidebar";

export default async function DashboardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const userRole = "provider";
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 ml-10 md:ml-6 mt-5">
        {/* {admin}
        {provider}
        {user} */}
        {userRole === "admin" ? admin : userRole === "provider" ? provider : user}
      </main>
    </div>
  );
}
