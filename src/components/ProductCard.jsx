import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCart, saveCart } from '../utils/storage';
import ProductImage from './ProductImage';

function ProductCard({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'customer') {
      setMessage('Only customers can add products to cart.');
      return;
    }

    const existing = getCart();
    const found = existing.find((item) => item.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }

    saveCart(existing);
    setMessage('Added to cart.');
  };

  const badges = [];
  if (Number(product.id) <= 4) badges.push('New');
  badges.push('Handmade');

  return (
    <motion.article
      className="card tribal-product-card group overflow-hidden p-0"
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.24 }}
    >
      <div className="relative overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={`${product.id}-${badge}`}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                badge === 'New' ? 'bg-[var(--tc-highlight)] text-[#2b2109]' : 'bg-[var(--tc-accent)] text-white'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--tc-secondary)]">{product.category}</p>
        <h3 className="text-lg font-semibold text-[var(--tc-ink)]">{product.name}</h3>
        <p className="text-sm text-[var(--tc-muted)]">{product.description}</p>
        <p className="text-sm text-[var(--tc-accent)]">By {product.artisanName}</p>
        {message ? <p className="text-xs font-medium text-[var(--tc-accent)]">{message}</p> : null}
        <div className="flex items-center justify-between pt-2">
          <span className="price-highlight text-lg font-bold text-tribal-700">${product.price}</span>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`} className="btn-secondary text-xs">
              Details
            </Link>
            <button type="button" onClick={handleAddToCart} className="btn-primary text-xs">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
