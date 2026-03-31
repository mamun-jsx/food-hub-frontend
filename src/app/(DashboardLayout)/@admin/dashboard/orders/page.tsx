import React from "react";
import { fetchAllOrdersServer } from "../../../../../../service/admin-apdpoint/server.apis";

const AdminOrderView = async () => {
  const orderData = await fetchAllOrdersServer();

  const orders = orderData?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.userId}</td>
                <td className="p-3 border">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                    {order.status}
                  </span>
                </td>
                <td className="p-3 border">${order.totalPrice}</td>
                <td className="p-3 border">{order.address}</td>

                {/* ITEMS */}
                <td className="p-3 border">
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.meal.image}
                          alt={item.meal.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.meal.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} | ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-3 border">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderView;
