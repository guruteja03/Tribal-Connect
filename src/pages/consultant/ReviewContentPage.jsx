import { useState } from 'react';
import { getProductReviewStatus, getProducts, setProductReviewStatus } from '../../utils/storage';

function ReviewContentPage() {
  const [statusMap, setStatusMap] = useState(getProductReviewStatus());
  const products = getProducts();

  const updateStatus = (id, status) => {
    const updated = setProductReviewStatus(id, status);
    setStatusMap(updated);
  };

  return (
    <div className="space-y-5">
      <h1 className="section-title">Review Product Content</h1>
      {products.slice(0, 4).map((product) => (
        <div key={product.id} className="card">
          <h3 className="font-semibold text-tribal-800">{product.name}</h3>
          <p className="mt-2 text-sm text-tribal-700">{product.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <button type="button" onClick={() => updateStatus(product.id, 'Approved')} className="btn-primary bg-green-700 hover:bg-green-800">
              Approve
            </button>
            <button type="button" onClick={() => updateStatus(product.id, 'Rejected')} className="btn-secondary border-red-700 text-red-700 hover:bg-red-50">
              Reject
            </button>
            <span className="text-sm text-tribal-700">Status: {statusMap[product.id] || 'Pending'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewContentPage;
