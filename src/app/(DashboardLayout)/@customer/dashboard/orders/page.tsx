
const MyOrder = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/orders`, {
    cache: "no-store",
    credentials: "include",
  });

  const data = await res.json();
  const orders = data?.data || [];

  return (
    <div className="p-4">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className="text-center">
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">${order.totalPrice}</td>
              <td className="p-2 border">{order.address}</td>

              <td className="p-2 border">
                {order.items?.map((item: any) => (
                  <div key={item.id}>
                    Meal: {item.mealId} | Qty: {item.quantity} | ${item.price}
                  </div>
                ))}
              </td>

              <td className="p-2 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MyOrder;
