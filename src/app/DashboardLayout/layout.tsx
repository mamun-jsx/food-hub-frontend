export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  return (
    <section>
      {admin}
      {user}
    </section>
  );
}
