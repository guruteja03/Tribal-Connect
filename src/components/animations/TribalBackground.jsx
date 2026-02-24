import { motion } from 'framer-motion';

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  size: 6 + (index % 5) * 3,
  left: (index * 17) % 100,
  duration: 10 + (index % 7) * 1.6,
  delay: (index % 6) * 0.7,
}));

function TribalBackground({ className = '', showMandala = false }) {
  return (
    <div className={`tribal-bg ${className}`.trim()} aria-hidden="true">
      <div className="tribal-bg-gradient" />
      <div className="tribal-pattern-overlay" />

      {showMandala ? (
        <motion.svg
          className="tribal-mandala"
          viewBox="0 0 300 300"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="150" cy="150" r="88" />
          <circle cx="150" cy="150" r="66" />
          <circle cx="150" cy="150" r="42" />
          <path d="M150 32 L166 86 L214 54 L182 102 L238 118 L182 134 L214 182 L166 150 L150 206 L134 150 L86 182 L118 134 L62 118 L118 102 L86 54 L134 86 Z" />
        </motion.svg>
      ) : null}

      <div className="tribal-particles">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="tribal-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
            }}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.8, 0.2, 0] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        className="floating-shape shape-a"
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="floating-shape shape-b"
        animate={{ y: [0, 16, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="floating-shape shape-c"
        animate={{ y: [0, -12, 0], x: [0, 6, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default TribalBackground;

