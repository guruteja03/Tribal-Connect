import { NavLink } from 'react-router-dom';

const linksByRole = {
  admin: [
    { label: 'Admin Dashboard', to: '/dashboard/admin' },
    { label: 'Transactions', to: '/dashboard/admin/transactions' },
  ],
  artisan: [
    { label: 'Artisan Dashboard', to: '/dashboard/artisan' },
    { label: 'Add Product', to: '/artisan/add-product' },
    { label: 'My Products', to: '/artisan/my-products' },
  ],
  customer: [
    { label: 'Customer Dashboard', to: '/dashboard/customer' },
    { label: 'Cart', to: '/cart' },
    { label: 'Checkout', to: '/customer/checkout' },
    { label: 'Order History', to: '/customer/order-history' },
    { label: 'Reviews', to: '/customer/reviews' },
  ],
  consultant: [
    { label: 'Consultant Dashboard', to: '/dashboard/consultant' },
    { label: 'Review Content', to: '/consultant/review-content' },
    { label: 'Artisan Profiles', to: '/consultant/artisan-profiles' },
  ],
};

function Sidebar({ role }) {
  const links = linksByRole[role] || [];

  return (
    <aside className="w-full rounded-xl border border-tribal-200 bg-white p-4 shadow-card md:w-64">
      <h2 className="mb-4 text-lg font-semibold text-tribal-800">Role Actions</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${
                  isActive ? 'bg-tribal-700 text-white' : 'text-tribal-700 hover:bg-tribal-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
