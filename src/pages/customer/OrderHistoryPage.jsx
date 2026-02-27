import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getOrders } from '../../utils/storage';

function OrderHistoryPage() {
  const { user } = useAuth();
  const orderHistory = useMemo(
    () =>
      getOrders()
        .filter((order) => String(order.userId) === String(user?.id))
        .map((order) => ({
          id: order.id,
          date: order.createdAt?.slice(0, 10),
          amount: order.amount,
          status: order.status,
        })),
    [user]
  );

  return (
    <div className="space-y-5">
      <h1 className="section-title">Order History</h1>
      {orderHistory.length === 0 ? <div className="card">No orders yet.</div> : null}
      {orderHistory.map((order) => (
        <div key={order.id} className="card flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold text-tribal-800">{order.id}</h3>
            <p className="text-sm text-tribal-700">Date: {order.date}</p>
          </div>
          <div className="text-sm text-tribal-700">
            <p>Status: {order.status}</p>
            <p>Amount: ${order.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryPage;
