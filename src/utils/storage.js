import { products as seedProducts } from '../data/products';

export const STORAGE_KEYS = {
  products: 'tribalcraft_products',
  cart: 'tribalcraft_cart',
  orders: 'tribalcraft_orders',
  reviews: 'tribalcraft_reviews',
  productReviewStatus: 'tribalcraft_product_review_status',
};

const readJSON = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getProducts = () => {
  const stored = readJSON(STORAGE_KEYS.products, null);
  if (stored) {
    const seedById = new Map(seedProducts.map((item) => [Number(item.id), item]));
    const refreshedStored = stored.map((item) => {
      const seed = seedById.get(Number(item.id));
      if (!seed) return item;
      return {
        ...item,
        image: seed.image,
      };
    });

    const knownIds = new Set(stored.map((item) => Number(item.id)));
    const missingSeeds = seedProducts.filter((item) => !knownIds.has(Number(item.id)));
    if (!missingSeeds.length) {
      writeJSON(STORAGE_KEYS.products, refreshedStored);
      return refreshedStored;
    }

    const merged = [...refreshedStored, ...missingSeeds];
    writeJSON(STORAGE_KEYS.products, merged);
    return merged;
  }
  writeJSON(STORAGE_KEYS.products, seedProducts);
  return seedProducts;
};

export const saveProducts = (products) => {
  writeJSON(STORAGE_KEYS.products, products);
};

export const addProduct = (payload, artisanName) => {
  const products = getProducts();
  const nextId = products.length ? Math.max(...products.map((item) => Number(item.id))) + 1 : 1;
  const created = {
    id: nextId,
    ...payload,
    price: Number(payload.price),
    artisanName,
    status: 'Draft',
    createdAt: new Date().toISOString(),
  };
  const updated = [...products, created];
  saveProducts(updated);
  return created;
};

export const updateProductById = (id, updates) => {
  const products = getProducts();
  const updated = products.map((item) =>
    Number(item.id) === Number(id)
      ? {
          ...item,
          ...updates,
          price: updates.price !== undefined ? Number(updates.price) : item.price,
        }
      : item
  );
  saveProducts(updated);
  return updated.find((item) => Number(item.id) === Number(id)) || null;
};

export const getCart = () => readJSON(STORAGE_KEYS.cart, []);

export const saveCart = (items) => {
  writeJSON(STORAGE_KEYS.cart, items);
};

export const getOrders = () => readJSON(STORAGE_KEYS.orders, []);

export const addOrder = (payload) => {
  const orders = getOrders();
  const created = {
    id: `ORD-${String(Date.now()).slice(-6)}`,
    ...payload,
    createdAt: new Date().toISOString(),
    status: payload.status || 'Placed',
  };
  const updated = [created, ...orders];
  writeJSON(STORAGE_KEYS.orders, updated);
  return created;
};

export const getReviews = () => readJSON(STORAGE_KEYS.reviews, []);

export const addReview = (payload) => {
  const reviews = getReviews();
  const created = {
    id: `REV-${String(Date.now()).slice(-6)}`,
    ...payload,
    createdAt: new Date().toISOString(),
  };
  const updated = [created, ...reviews];
  writeJSON(STORAGE_KEYS.reviews, updated);
  return created;
};

export const getProductReviewStatus = () => readJSON(STORAGE_KEYS.productReviewStatus, {});

export const setProductReviewStatus = (productId, status) => {
  const current = getProductReviewStatus();
  const updated = { ...current, [productId]: status };
  writeJSON(STORAGE_KEYS.productReviewStatus, updated);
  return updated;
};
