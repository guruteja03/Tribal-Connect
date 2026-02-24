import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/animations/AnimatedPage';
import { getCart, getProducts, saveCart } from '../utils/storage';
import ProductImage from '../components/ProductImage';
import { fadeUpItem, staggerContainer } from '../components/animations/MotionPresets';
import './Cart.css';
import bambooBasketImage from '../../punarnawa-soul-of-artistry-basket-default-title-n-handwoven-bamboo-mesh-basket-32440752242745.webp';

const craftImageLibrary = [
  {
    keywords: ['warli', 'painting'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Warli%20painting.jpg'
  },
  {
    keywords: ['dokra', 'dhokra', 'metal', 'brass', 'figurine'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhokra%20%28couple%29.jpg'
  },
  {
    keywords: ['bamboo', 'basket', 'reed', 'palm', 'grass'],
    image: bambooBasketImage
  },
  {
    keywords: ['beaded', 'bead', 'jewelry', 'necklace', 'anklet'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancestral%20Naga%20Tribal%20Beads.jpg'
  },
  {
    keywords: ['saree', 'sari', 'handloom', 'woven', 'textile', 'stole'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saree%20Weaving%20by%20Handloom.jpg'
  },
  {
    keywords: ['mask', 'wood', 'wooden', 'carved'],
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Handcrafted%20Tribal%20Mask%20of%20West%20Bengal%2C%20India.%20Chhau%20Mask.jpg'
  },
  {
    keywords: ['terracotta', 'clay', 'pottery', 'vase', 'lamp', 'jar'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankura%20Terracotta%20Horses.jpg'
  }
];

const getMatchedCraftImage = (name = '', fallback = '') => {
  const lowerName = String(name).toLowerCase();
  const match = craftImageLibrary.find((entry) =>
    entry.keywords.some((keyword) => lowerName.includes(keyword))
  );
  return match?.image || fallback;
};

export const sampleCartItems = [
  {
    id: 'warli-art-painting',
    name: 'Warli Art Painting - Sacred Harvest Story',
    artisan: 'Sushila V. Dhurve',
    region: 'Maharashtra',
    price: 89,
    quantity: 1,
    description:
      'Hand-painted using natural pigments and rice paste in the classic Warli style. The motifs celebrate harvest rituals, community dance, and the rhythm of village life. Every line carries an oral tradition passed down through tribal families.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Warli%20painting.jpg'
  },
  {
    id: 'dokra-metal-craft',
    name: 'Dokra Metal Craft - Dancing Deer Figurine',
    artisan: 'Ramesh Netam',
    region: 'Chhattisgarh',
    price: 120,
    quantity: 1,
    description:
      'Created through the ancient lost-wax casting process, this Dokra piece reflects fluid tribal forms and storytelling. Each sculpture is one of a kind due to handmade moulding and firing. It preserves one of India\'s oldest living metal craft traditions.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhokra%20%28couple%29.jpg'
  },
  {
    id: 'bamboo-handicraft',
    name: 'Bamboo Handicraft - Festival Utility Basket',
    artisan: 'Lakshmi Soren',
    region: 'Odisha',
    price: 58,
    quantity: 1,
    description:
      'Woven from treated bamboo strips by skilled tribal artisans for durability and elegance. The patterning is inspired by seasonal festival markets and agrarian life. Lightweight, sustainable, and deeply rooted in eco-conscious craft heritage.',
    image: bambooBasketImage
  },
  {
    id: 'tribal-beaded-jewelry',
    name: 'Tribal Beaded Jewelry - Heritage Layered Necklace',
    artisan: 'Madhabi Kirsani',
    region: 'Andhra Pradesh',
    price: 46,
    quantity: 1,
    description:
      'Hand-strung beads in vibrant ceremonial color combinations worn during community gatherings. The layered form represents identity, celebration, and intergenerational memory. Crafted in small batches to maintain traditional design language.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancestral%20Naga%20Tribal%20Beads.jpg'
  },
  {
    id: 'handwoven-tribal-saree',
    name: 'Handwoven Tribal Saree - Earth Loom Edition',
    artisan: 'Padma Majhi',
    region: 'Odisha',
    price: 140,
    quantity: 1,
    description:
      'Woven on a handloom with tribal border motifs that echo forest geometry and river pathways. The textile balances breathable comfort with ceremonial richness. Every saree supports women-led weaving clusters and preserves indigenous loom practices.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saree%20Weaving%20by%20Handloom.jpg'
  },
  {
    id: 'wooden-tribal-mask',
    name: 'Wooden Tribal Mask - Ritual Guardian Form',
    artisan: 'Bikash Pujari',
    region: 'Chhattisgarh',
    price: 95,
    quantity: 1,
    description:
      'Hand-carved from seasoned wood and painted in symbolic festival colors. The mask style is inspired by ceremonial performances that narrate protection, harvest, and nature spirits. Subtle carving marks reveal the artisan\'s individual handwork.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handcrafted%20Tribal%20Mask%20of%20West%20Bengal%2C%20India.%20Chhau%20Mask.jpg'
  },
  {
    id: 'terracotta-tribal-art',
    name: 'Terracotta Tribal Art - Mother Earth Idol Set',
    artisan: 'Gitanjali Murmu',
    region: 'Maharashtra',
    price: 72,
    quantity: 1,
    description:
      'Moulded from local clay and kiln-fired using traditional low-flame methods. The earthy finish and embossed patterns embody fertility, land, and seasonal cycles in tribal cosmology. A soulful decor piece that keeps ancestral symbolism alive.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankura%20Terracotta%20Horses.jpg'
  }
];

const sampleByName = sampleCartItems.reduce((acc, item) => {
  acc[item.name.toLowerCase()] = item;
  return acc;
}, {});

const buildInitialCart = () => {
  const stored = getCart();
  const products = getProducts();
  const productById = new Map(products.map((product) => [String(product.id), product]));
  const productByName = new Map(products.map((product) => [String(product.name).toLowerCase(), product]));

  if (!stored.length) {
    const seeded = sampleCartItems.map((item) => ({
      ...item,
      image: item.image || getMatchedCraftImage(item.name, '')
    }));
    saveCart(seeded);
    return seeded;
  }

  return stored.map((item) => {
    const match = sampleByName[item.name?.toLowerCase?.() || ''];
    const catalogMatch =
      productById.get(String(item.id)) || productByName.get(String(item.name || '').toLowerCase());

    if (!match) {
      return {
        ...item,
        artisan: 'Community Artisan Collective',
        region: 'India',
        description:
          'Handcrafted by tribal artisan communities using traditional methods and locally sourced materials. This craft reflects living heritage and supports rural livelihoods through ethical commerce.',
        image: catalogMatch?.image || item.image || getMatchedCraftImage(item.name, '')
      };
    }

    return {
      ...match,
      ...item,
      quantity: item.quantity || 1,
      image: catalogMatch?.image || item.image || match.image
    };
  });
};

function CartPage() {
  const [cartItems, setCartItems] = useState(buildInitialCart);

  const updateCart = (items) => {
    setCartItems(items);
    saveCart(items);
  };

  const handleQtyChange = (id, qty) => {
    const value = Number(qty);
    if (Number.isNaN(value) || value < 1) return;

    const updated = cartItems.map((item) => (item.id === id ? { ...item, quantity: value } : item));
    updateCart(updated);
  };

  const increaseQty = (id, current) => handleQtyChange(id, current + 1);

  const decreaseQty = (id, current) => {
    if (current <= 1) return;
    handleQtyChange(id, current - 1);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <AnimatedPage className="festival-cart">
      <div className="festival-overlay" aria-hidden="true" />
      <div className="festival-cart__container">
        <motion.header
          className="festival-cart__header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="festival-kicker">TribalCraft Cart</p>
          <h1 className="festival-title">Celebrate Craft. Empower Artisans.</h1>
          <p className="festival-subtitle">
            Curated tribal handicrafts from artisan communities across India, brought to your doorstep.
          </p>
        </motion.header>

        {cartItems.length === 0 ? (
          <div className="festival-empty">
            <h2>Your cart is empty</h2>
            <p>Explore handcrafted tribal collections and support artisan livelihoods.</p>
            <Link to="/products" className="festival-btn festival-btn--browse">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              className="festival-grid"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {cartItems.map((item) => (
                <motion.article
                  key={item.id}
                  className="festival-card"
                  variants={fadeUpItem}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="festival-card__image-wrap">
                    <ProductImage src={item.image} alt={item.name} className="festival-card__image" />
                    <span className="festival-card__region">{item.region}</span>
                  </div>

                  <div className="festival-card__content">
                    <div>
                      <h3 className="festival-card__name">{item.name}</h3>
                      <p className="festival-card__artisan">Artisan: {item.artisan}</p>
                      <p className="festival-card__description">{item.description}</p>
                    </div>

                    <div className="festival-card__bottom">
                      <div>
                        <p className="festival-card__price price-highlight">${item.price.toFixed(2)}</p>
                        <p className="festival-card__subtotal">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="festival-actions">
                        <div className="festival-qty" aria-label={`Quantity controls for ${item.name}`}>
                          <motion.button
                            type="button"
                            onClick={() => decreaseQty(item.id, item.quantity)}
                            className="festival-qty__btn"
                            aria-label={`Decrease quantity for ${item.name}`}
                            whileTap={{ scale: 0.86 }}
                            whileHover={{ scale: 1.08 }}
                          >
                            -
                          </motion.button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(event) => handleQtyChange(item.id, event.target.value)}
                            className="festival-qty__input"
                          />
                          <motion.button
                            type="button"
                            onClick={() => increaseQty(item.id, item.quantity)}
                            className="festival-qty__btn"
                            aria-label={`Increase quantity for ${item.name}`}
                            whileTap={{ scale: 0.86 }}
                            whileHover={{ scale: 1.08 }}
                          >
                            +
                          </motion.button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="festival-btn festival-btn--remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.aside
              className="festival-summary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div>
                <p className="festival-summary__label">Grand Total</p>
                <p className="festival-summary__total">${total.toFixed(2)}</p>
              </div>
              <p className="festival-summary__meta">Taxes and shipping calculated at checkout.</p>
              <Link to="/customer/checkout" className="festival-btn festival-btn--checkout pulse-cta">
                Proceed to Checkout
              </Link>
            </motion.aside>
          </>
        )}
      </div>
    </AnimatedPage>
  );
}

export default CartPage;

