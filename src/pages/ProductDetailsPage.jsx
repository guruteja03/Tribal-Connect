import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../utils/storage';
import ProductImage from '../components/ProductImage';

function ProductDetailsPage() {
  const { id } = useParams();
  const product = getProducts().find((item) => Number(item.id) === Number(id));

  if (!product) {
    return (
      <div className="card">
        <h1 className="text-xl font-bold">Product not found</h1>
        <Link to="/products" className="btn-secondary mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProductImage src={product.image} alt={product.name} className="h-80 w-full rounded-xl object-cover" />
      <div className="card space-y-3">
        <h1 className="text-3xl font-bold text-tribal-800">{product.name}</h1>
        <p className="text-tribal-700">{product.description}</p>
        <p className="text-sm text-tribal-600">Category: {product.category}</p>
        <p className="text-sm text-tribal-600">Artisan: {product.artisanName}</p>
        <p className="text-2xl font-bold text-tribal-700">${product.price}</p>
        <Link to="/products" className="btn-secondary inline-block">
          Back
        </Link>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
