import { fetchAllOrderForUser } from "../../../../service/user-api-endpoint";

const MyOrder = async () => {
  const res = await fetchAllOrderForUser();
  const orders = res?.data || [];

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
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
                      Meal: {item.mealId} | Qty: {item.quantity} | Price: $
                      {item.price}
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
    </div>
  );
};

export default MyOrder;
