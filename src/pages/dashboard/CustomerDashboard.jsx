import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCart, getOrders, getReviews } from '../../utils/storage';

function CustomerDashboard() {
  const { user } = useAuth();
  const stats = useMemo(() => {
    const cart = getCart();
    const orders = getOrders().filter((item) => item.userId === user?.id);
    const reviews = getReviews().filter((item) => item.userId === user?.id);
    return { cartItems: cart.reduce((sum, item) => sum + item.quantity, 0), orders: orders.length, reviews: reviews.length };
  }, [user]);

  return (
    <div className="space-y-5">
      <h1 className="section-title">Customer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm">Cart Items</p><p className="text-2xl font-bold">{stats.cartItems}</p></div>
        <div className="card"><p className="text-sm">Orders Placed</p><p className="text-2xl font-bold">{stats.orders}</p></div>
        <div className="card"><p className="text-sm">Reviews Left</p><p className="text-2xl font-bold">{stats.reviews}</p></div>
      </div>
      <p className="text-tribal-700">Browse products, place orders, and review crafts you purchase.</p>
    </div>
  );
}

export default CustomerDashboard;
