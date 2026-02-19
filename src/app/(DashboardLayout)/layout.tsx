export default async function DashboardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const userRole = "user";
  return (
    <section>
      {/* {userRole === "admin" ? admin : userRole === "provider" ? provider : user} */}
      {admin}
      {provider}
      {user}
    </section>
  );
}
