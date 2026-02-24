import { useMemo } from 'react';
import { getProductReviewStatus, getProducts } from '../../utils/storage';

function ConsultantDashboard() {
  const stats = useMemo(() => {
    const products = getProducts();
    const statusMap = getProductReviewStatus();
    let approved = 0;
    let rejected = 0;
    products.forEach((product) => {
      if (statusMap[product.id] === 'Approved') approved += 1;
      if (statusMap[product.id] === 'Rejected') rejected += 1;
    });
    return { approved, rejected, pending: products.length - approved - rejected };
  }, []);

  return (
    <div className="space-y-5">
      <h1 className="section-title">Cultural Consultant Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm">Pending Reviews</p><p className="text-2xl font-bold">{stats.pending}</p></div>
        <div className="card"><p className="text-sm">Approved</p><p className="text-2xl font-bold">{stats.approved}</p></div>
        <div className="card"><p className="text-sm">Rejected</p><p className="text-2xl font-bold">{stats.rejected}</p></div>
      </div>
      <p className="text-tribal-700">Review cultural authenticity and product descriptions before publication.</p>
    </div>
  );
}

export default ConsultantDashboard;
