import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addProduct } from '../../utils/storage';

function AddProductPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(
      {
        ...formData,
        image: 'https://picsum.photos/seed/tribalcraft-artisan-default/900/700',
      },
      user?.name || 'Artisan'
    );
    setMessage('Product saved successfully.');
    setFormData({ name: '', category: '', price: '', description: '' });
    setTimeout(() => navigate('/artisan/my-products'), 700);
  };

  return (
    <div className="mx-auto max-w-2xl card">
      <h1 className="section-title">Add Product</h1>
      {message ? <p className="mt-2 text-sm text-green-700">{message}</p> : null}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded border border-tribal-300 px-3 py-2" placeholder="Product Name" />
        <input name="category" value={formData.category} onChange={handleChange} required className="w-full rounded border border-tribal-300 px-3 py-2" placeholder="Category" />
        <input name="price" value={formData.price} onChange={handleChange} required type="number" className="w-full rounded border border-tribal-300 px-3 py-2" placeholder="Price" />
        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full rounded border border-tribal-300 px-3 py-2" placeholder="Description" rows="4" />
        <button type="submit" className="btn-primary">Save Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;
