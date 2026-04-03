import UpdateProfileForm from "@/components/modules/Form/UpdateProfileForm";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <section>
      <h2>Update your profile..</h2>
      <UpdateProfileForm />
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">
            Manage providers, users, and orders efficiently
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Total Providers</h3>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border">#1234</td>
                <td className="p-2 border">John Doe</td>
                <td className="p-2 border">$45</td>
                <td className="p-2 border text-green-600">Delivered</td>
              </tr>

              <tr>
                <td className="p-2 border">#1235</td>
                <td className="p-2 border">Jane Smith</td>
                <td className="p-2 border">$30</td>
                <td className="p-2 border text-yellow-600">Preparing</td>
              </tr>

              <tr>
                <td className="p-2 border">#1236</td>
                <td className="p-2 border">Alex</td>
                <td className="p-2 border">$60</td>
                <td className="p-2 border text-red-500">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="flex gap-3">
            <Link
              href="/dashboard/users"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Users
            </Link>

            <Link
              href="/dashboard/orders"
              className="bg-green-400 text-white px-4 py-2 rounded"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
