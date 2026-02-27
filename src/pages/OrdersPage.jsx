import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../utils/storage';

function OrdersPage() {
  const { user } = useAuth();
  const orders = useMemo(() => {
    const allOrders = getOrders();
    if (user?.role === 'customer') {
      return allOrders.filter((order) => String(order.userId) === String(user.id));
    }
    return allOrders;
  }, [user]);

  return (
    <div className="space-y-5">
      <h1 className="section-title">Orders</h1>
      {orders.length === 0 ? <div className="card">No orders available.</div> : null}
      <div className="space-y-3">
        {orders.map((order) => (
          <article key={order.id} className="card flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div>
              <h3 className="font-semibold text-tribal-800">{order.id}</h3>
              <p className="text-sm text-tribal-700">{order.items?.length || 0} item(s)</p>
            </div>
            <div className="text-sm text-tribal-700">
              <p>Status: {order.status}</p>
              <p>Amount: ${order.amount}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
