import { getOrders, getProducts, getReviews } from '../../utils/storage';

function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem('tribalcraft_admin_users') || '[]');
  const products = getProducts();
  const orders = getOrders();
  const reviews = getReviews();

  return (
    <div className="space-y-6">
      <h1 className="section-title">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm">Total Users</p><p className="text-2xl font-bold">{users.length}</p></div>
        <div className="card"><p className="text-sm">Total Products</p><p className="text-2xl font-bold">{products.length}</p></div>
        <div className="card"><p className="text-sm">Transactions</p><p className="text-2xl font-bold">{orders.length}</p></div>
      </div>

      <section className="card">
        <h2 className="mb-3 text-lg font-semibold text-tribal-800">View All Users</h2>
        <ul className="space-y-2 text-sm">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between border-b border-tribal-100 pb-2">
              <span>{user.name}</span>
              <span className="capitalize">{user.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 className="mb-3 text-lg font-semibold text-tribal-800">View All Products</h2>
        <ul className="space-y-2 text-sm">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between border-b border-tribal-100 pb-2">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2 className="mb-3 text-lg font-semibold text-tribal-800">Customer Reviews</h2>
        <p className="text-sm text-tribal-700">Total reviews: {reviews.length}</p>
      </section>
    </div>
  );
}

export default AdminDashboard;
