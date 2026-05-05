import UpdateProfileForm from "@/components/modules/Form/UpdateProfileForm";


const page = async () => {
  return (
    <section>
      <h2>Update your profile</h2>
      <UpdateProfileForm />
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Here’s your activity overview
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Total Orders</h3>

            <p className="text-2xl font-bold mt-2">8</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Delivered</h3>
            <p className="text-2xl font-bold mt-2 text-green-600">5</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-2xl font-bold mt-2 text-yellow-600">3</p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Order #501 delivered successfully</li>
            <li>⏳ Order #502 is being prepared</li>
            <li>❌ Order #503 was cancelled</li>
          </ul>
        </div>

        {/* INFO */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Note</h2>
          <p className="text-gray-600">
            You can check your order details and track delivery status from your
            orders page.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
