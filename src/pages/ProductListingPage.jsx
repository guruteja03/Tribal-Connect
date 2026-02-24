import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/animations/AnimatedPage';
import ProductCard from '../components/ProductCard';
import { fadeUpItem, staggerContainer } from '../components/animations/MotionPresets';
import { getProducts } from '../utils/storage';

function ProductListingPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [products] = useState(() => getProducts());
  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);

  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === 'All' || product.category === category) &&
          (product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()))
      ),
    [products, query, category]
  );

  return (
    <AnimatedPage className="space-y-6">
      <div className="tribal-glass-card flex flex-col gap-4 rounded-2xl border border-[var(--tc-primary)]/15 p-5 md:flex-row md:items-center md:justify-between">
        <h1 className="section-title">Tribal Product Collection</h1>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full px-3 py-2 md:min-w-64"
            placeholder="Search products"
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="px-3 py-2 md:min-w-44">
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((product) => (
          <motion.div key={product.id} variants={fadeUpItem}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatedPage>
  );
}

export default ProductListingPage;
