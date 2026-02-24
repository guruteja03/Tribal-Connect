import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, updateProductById } from '../../utils/storage';

function EditProductPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const product = getProducts().find((item) => Number(item.id) === Number(id));
    if (!product) {
      setFormData(null);
      return;
    }
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      status: product.status || 'Draft',
    });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData) return;
    updateProductById(id, formData);
    setMessage('Product updated successfully.');
  };

  if (!formData) {
    return (
      <div className="mx-auto max-w-2xl card space-y-3">
        <h1 className="section-title">Edit Product #{id}</h1>
        <p className="text-tribal-700">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl card space-y-4">
      <h1 className="section-title">Edit Product #{id}</h1>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded border border-tribal-300 px-3 py-2" />
      <input name="category" value={formData.category} onChange={handleChange} className="w-full rounded border border-tribal-300 px-3 py-2" />
      <input name="price" value={formData.price} onChange={handleChange} type="number" className="w-full rounded border border-tribal-300 px-3 py-2" />
      <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full rounded border border-tribal-300 px-3 py-2" />
      <select name="status" value={formData.status} onChange={handleChange} className="rounded border border-tribal-300 px-3 py-2">
        <option>Draft</option>
        <option>Published</option>
        <option>Archived</option>
      </select>
      <button type="button" className="btn-primary" onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default EditProductPage;
