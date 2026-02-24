import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addOrder, getCart, saveCart } from '../../utils/storage';

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cart = getCart();

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const placeOrder = () => {
    addOrder({
      userId: user?.id,
      userName: user?.name || 'Customer',
      amount: Number(total.toFixed(2)),
      items: cart,
    });
    saveCart([]);
    navigate('/customer/order-history');
  };

  if (cart.length === 0) {
    return (
      <div className="card">
        <p>No items in cart for checkout.</p>
        <Link to="/products" className="btn-secondary mt-3 inline-block">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl card space-y-4">
      <h1 className="section-title">Checkout</h1>
      <ul className="space-y-2 text-sm">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
      <button type="button" onClick={placeOrder} className="btn-primary">Place Order</button>
    </div>
  );
}

export default CheckoutPage;
