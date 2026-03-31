"use client";
import {
  fetchProviderOrders,
  updateOrderStatus,
} from "../../../../../../service/provider-apiEndPoint";
import { useEffect, useState } from "react";
type Order = {
  id: string;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  totalPrice: number;
  address: string;
  items: any[];
};

export default function ProviderViewOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProviderOrders();

        console.log("🔥 Provider Orders:", data);

        setOrders(data.data); // IMPORTANT
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ✅ UPDATE STATUS
  const handleStatusChange = async (id: string, status: Order["status"]) => {
    try {
      await updateOrderStatus(id, status);

      // ✅ instant UI update
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Provider Orders</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Items</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              {/* ID */}
              <td className="p-2 border">{order.id.slice(0, 8)}...</td>

              {/* PRICE */}
              <td className="p-2 border">${order.totalPrice}</td>

              {/* ADDRESS */}
              <td className="p-2 border">{order.address}</td>

              {/* STATUS */}
              <td className="p-2 border">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as any)
                  }
                  className="border px-2 py-1"
                >
                  <option value="PLACED">PLACED</option>
                  <option value="PREPARING">PREPARING</option>
                  <option value="READY">READY</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>

              {/* ITEMS */}
              <td className="p-2 border">
                {order.items.map((item: any) => (
                  <div key={item.id}>
                    {item.meal.name} × {item.quantity}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
