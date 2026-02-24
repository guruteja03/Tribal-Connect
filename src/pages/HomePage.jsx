import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedPage from '../components/animations/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const collectionCards = [
  {
    title: 'Tribal Paintings',
    description: 'Warli, Gond, Bhil, and Saura storytelling traditions in vivid handcrafted compositions.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Warli%20painting.jpg',
  },
  {
    title: 'Dokra Metal Crafts',
    description: 'Lost-wax cast artifacts preserving one of the oldest living tribal metal traditions.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhokra%20%28couple%29.jpg',
  },
  {
    title: 'Handwoven Textiles',
    description: 'Earth-toned looms and geometric motifs woven by indigenous artisan communities.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saree%20Weaving%20by%20Handloom.jpg',
  },
  {
    title: 'Bamboo Handicrafts',
    description: 'Utility craft rooted in sustainability with rhythmic weave structures and bold form.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Tribal Jewelry',
    description: 'Layered beadwork and ceremonial ornaments inspired by local identity and heritage.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancestral%20Naga%20Tribal%20Beads.jpg',
  },
  {
    title: 'Terracotta Art',
    description: 'Kiln-fired clay objects echoing ritual forms and symbols of land and community.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankura%20Terracotta%20Horses.jpg',
  },
];

const whyChooseUs = [
  { title: '100% Authentic', description: 'Every product is culturally reviewed and rooted in real artisan lineage.' },
  { title: 'Direct from Artisans', description: 'No exploitative middle layers. Your purchase supports maker communities.' },
  { title: 'Handmade Excellence', description: 'Each piece reflects manual craft, time, ritual, and skill.' },
  { title: 'Sustainable First', description: 'Natural materials, low-waste practices, and community-centered production.' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function HomePage() {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [-30, 40]);

  return (
    <AnimatedPage className="home-page">
      <section ref={heroRef} className="home-hero">
        <motion.div className="home-hero-bg" style={{ y: heroY }} />
        <div className="home-hero-overlay" />
        <svg className="home-hero-motif" viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.7">
            <circle cx="80" cy="70" r="13" />
            <path d="M80 83 L66 110 L94 110 Z M80 110 L80 144 M80 124 L60 138 M80 124 L100 138 M80 144 L63 163 M80 144 L97 163" />
            <circle cx="150" cy="74" r="12" />
            <path d="M150 86 L137 112 L163 112 Z M150 112 L150 146 M150 126 L132 139 M150 126 L168 139 M150 146 L135 164 M150 146 L165 164" />
            <path d="M248 80 A34 34 0 1 1 247 80" />
            <path d="M248 56 L248 104 M224 80 L272 80 M232 64 L264 96 M264 64 L232 96" />
            <path d="M290 156 L312 124 L334 156 L356 124 L378 156" />
          </g>
        </svg>

        <motion.div
          className="home-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="home-kicker">Welcome, {user?.name || 'Cultural Explorer'}</p>
          <h1>Where Tribal Craft Meets Modern Commerce</h1>
          <p>Discover handcrafted work from indigenous makers with transparent stories and fair value.</p>
          <div className="home-hero-actions">
            <Link to="/products" className="home-btn home-btn-primary">
              Explore Collection
            </Link>
            <Link to="/register" className="home-btn home-btn-secondary">
              Become an Artisan
            </Link>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="home-section"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="home-section-head">
          <h2>Featured Tribal Collections</h2>
          <p>Curated categories rooted in regional craft traditions and festival storytelling.</p>
        </motion.div>
        <div className="home-collection-grid">
          {collectionCards.map((card) => (
            <motion.article key={card.title} variants={fadeUp} className="home-collection-card">
              <div className="home-collection-image-wrap">
                <img src={card.image} alt={card.title} className="home-collection-image" loading="lazy" />
              </div>
              <div className="home-collection-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <div className="home-divider" aria-hidden="true" />

      <motion.section
        className="home-about"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="home-about-image-wrap">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Handcrafted%20Tribal%20Mask%20of%20West%20Bengal%2C%20India.%20Chhau%20Mask.jpg"
            alt="Traditional tribal art piece"
            className="home-about-image"
            loading="lazy"
          />
        </div>
        <div className="home-about-content">
          <h2>About Tribal Connect</h2>
          <p>
            Tribal Connect bridges indigenous artistry with modern digital marketplaces while preserving cultural context.
            We collaborate with artisans, consultants, and conscious buyers to ensure each product carries story, value,
            and dignity.
          </p>
          <Link to="/about" className="home-btn home-btn-primary">
            Learn More
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="home-spotlight"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.62 }}
      >
        <div className="home-spotlight-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?auto=format&fit=crop&w=900&q=80"
            alt="Artisan spotlight"
            className="home-spotlight-avatar"
            loading="lazy"
          />
        </div>
        <div className="home-spotlight-content">
          <p className="home-kicker">Artisan Spotlight</p>
          <h3>Padma Majhi, Odisha</h3>
          <p>
            "Each weave carries songs from our festivals and rivers. When someone buys our craft, they become part of
            our story."
          </p>
        </div>
      </motion.section>

      <motion.section
        className="home-section"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="home-section-head">
          <h2>Why Choose Us</h2>
          <p>Built for cultural trust, fair artisan earnings, and sustainable craft commerce.</p>
        </motion.div>
        <div className="home-why-grid">
          {whyChooseUs.map((item) => (
            <motion.article key={item.title} variants={fadeUp} className="home-why-card">
              <span className="home-why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L15 8 L22 9 L17 14 L18 22 L12 18 L6 22 L7 14 L2 9 L9 8 Z" />
                </svg>
              </span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </AnimatedPage>
  );
}

export default HomePage;
