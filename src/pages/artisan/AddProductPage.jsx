import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addProduct } from '../../utils/storage';

const DEFAULT_IMAGE = '/images/bamboo-basket.webp';

function AddProductPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(
      {
        ...formData,
        image: formData.image || DEFAULT_IMAGE,
      },
      user?.name || 'Artisan'
    );
    setMessage('Product saved successfully.');
    setFormData({ name: '', category: '', price: '', description: '', image: '' });
    setTimeout(() => navigate('/artisan/my-products'), 700);
  };

  return (
    <div className="mx-auto max-w-3xl px-2 sm:px-0">
      <div className="card rounded-2xl border border-tribal-200/80 bg-white/95 p-5 shadow-[0_14px_34px_rgba(56,32,20,0.1)] sm:p-7">
        <h1 className="section-title">Add Product</h1>
        {message ? <p className="mt-2 text-sm text-green-700">{message}</p> : null}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-tribal-800">Product Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Bamboo Basket"
            className="h-11 w-full rounded-md border border-tribal-300 px-3 text-sm outline-none transition focus:border-tribal-500 focus:ring-2 focus:ring-tribal-200"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-tribal-800">Category</label>
            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g. Home Decor"
              className="h-11 w-full rounded-md border border-tribal-300 px-3 text-sm outline-none transition focus:border-tribal-500 focus:ring-2 focus:ring-tribal-200"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-tribal-800">Price</label>
            <input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              type="number"
              placeholder="e.g. 499"
              className="h-11 w-full rounded-md border border-tribal-300 px-3 text-sm outline-none transition focus:border-tribal-500 focus:ring-2 focus:ring-tribal-200"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-tribal-800">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write a short description..."
            rows="4"
            className="w-full rounded-md border border-tribal-300 px-3 py-2 text-sm outline-none transition focus:border-tribal-500 focus:ring-2 focus:ring-tribal-200"
          />
        </div>
        <div className="space-y-2 rounded-md border border-tribal-200 bg-tribal-50/40 p-3">
          <label htmlFor="product-image" className="block text-sm font-medium text-tribal-800">Product Image</label>
          <input
            id="product-image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block h-11 w-full rounded-md border border-tribal-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-tribal-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-tribal-700"
          />
          {formData.image ? (
            <img src={formData.image} alt="Selected product preview" className="h-44 w-full rounded-md border border-tribal-200 object-cover" />
          ) : (
            <p className="text-xs text-tribal-700">No image selected yet.</p>
          )}
        </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">Save Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
