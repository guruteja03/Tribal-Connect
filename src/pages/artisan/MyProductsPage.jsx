import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProducts } from '../../utils/storage';

function MyProductsPage() {
  const { user } = useAuth();
  const list = useMemo(
    () => getProducts().filter((product) => product.artisanName === (user?.name || '')).slice(0, 10),
    [user]
  );

  return (
    <div className="space-y-5">
      <h1 className="section-title">My Listed Products</h1>
      {list.length === 0 ? <div className="card">No products listed yet.</div> : null}
      {list.map((product) => (
        <div key={product.id} className="card flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold text-tribal-800">{product.name}</h3>
            <p className="text-sm text-tribal-700">${product.price} | {product.status || 'Draft'}</p>
          </div>
          <Link to={`/artisan/edit-product/${product.id}`} className="btn-secondary">
            Edit Product
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyProductsPage;
