import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCart, getOrders, getReviews } from '../../utils/storage';

function CustomerDashboard() {
  const { user } = useAuth();
  const stats = useMemo(() => {
    const cart = getCart();
    const orders = getOrders().filter((item) => String(item.userId) === String(user?.id));
    const reviews = getReviews().filter((item) => String(item.userId) === String(user?.id));
    return { cartItems: cart.reduce((sum, item) => sum + item.quantity, 0), orders: orders.length, reviews: reviews.length };
  }, [user]);

  return (
    <div className="space-y-5">
      <h1 className="section-title">Customer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/cart" className="card flex min-h-28 flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-card" aria-label="Open cart">
          <p className="text-sm">Cart Items</p>
          <p className="text-2xl font-bold">{stats.cartItems}</p>
        </Link>
        <Link
          to="/customer/order-history"
          className="card flex min-h-28 flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-card"
          aria-label="Open order history"
        >
          <p className="text-sm">Orders Placed</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </Link>
        <div className="card flex min-h-28 flex-col justify-between p-5"><p className="text-sm">Reviews Left</p><p className="text-2xl font-bold">{stats.reviews}</p></div>
      </div>
      <div>
        <Link to="/customer/checkout" className="btn-primary inline-block">
          Go to Checkout
        </Link>
      </div>
      <p className="break-words text-tribal-700">Browse products, place orders, and review crafts you purchase.</p>
    </div>
  );
}

export default CustomerDashboard;
