import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const particles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: (index * 13 + 7) % 100,
  top: (index * 17 + 11) % 100,
  size: 2 + (index % 4) * 1.7,
  duration: 8 + (index % 6) * 2.2,
  delay: (index % 9) * 0.4,
}));

function NightFestivalBackdrop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const parallaxY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 26;
      const y = (event.clientY / window.innerHeight - 0.5) * 26;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="nf-bg" aria-hidden="true">
      <motion.div className="nf-bg-base" initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1 }} />
      <div className="nf-wave nf-wave-a" />
      <div className="nf-wave nf-wave-b" />
      <div className="nf-wave nf-wave-c" />

      <motion.div className="nf-pattern-layer" style={{ x: parallaxX, y: parallaxY }}>
        <svg className="nf-warli-overlay" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5">
            <circle cx="90" cy="100" r="12" />
            <path d="M90 112 L74 140 L106 140 Z" />
            <path d="M90 112 L90 154 M90 132 L70 148 M90 132 L110 148 M90 154 L72 178 M90 154 L108 178" />
            <circle cx="180" cy="112" r="11" />
            <path d="M180 123 L166 147 L194 147 Z" />
            <path d="M180 123 L180 165 M180 141 L160 156 M180 141 L200 156 M180 165 L164 186 M180 165 L196 186" />
            <path d="M262 104 A45 45 0 1 1 261 104" />
            <path d="M242 104 L282 104 M262 84 L262 124 M247 89 L277 119 M277 89 L247 119" />
            <path d="M330 172 L350 132 L370 172 L390 132 L410 172" />
            <path d="M430 164 L458 128 L486 164 L514 128 L542 164" />
          </g>
        </svg>
      </motion.div>

      <motion.div className="nf-floaters" style={{ x: parallaxX, y: parallaxY }}>
        <motion.svg
          className="nf-floater nf-mask"
          viewBox="0 0 200 220"
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M100 20 C150 20 172 60 172 114 C172 165 140 206 100 206 C60 206 28 165 28 114 C28 60 50 20 100 20Z" />
          <circle cx="72" cy="96" r="9" />
          <circle cx="128" cy="96" r="9" />
          <path d="M74 148 Q100 166 126 148" />
        </motion.svg>

        <motion.svg
          className="nf-floater nf-warli"
          viewBox="0 0 220 180"
          animate={{ y: [0, 10, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8">
            <circle cx="45" cy="36" r="8" />
            <path d="M45 44 L33 66 L57 66 Z M45 66 L45 100 M45 82 L30 94 M45 82 L60 94 M45 100 L32 120 M45 100 L58 120" />
            <circle cx="95" cy="36" r="8" />
            <path d="M95 44 L83 66 L107 66 Z M95 66 L95 100 M95 82 L80 94 M95 82 L110 94 M95 100 L82 120 M95 100 L108 120" />
            <circle cx="145" cy="36" r="8" />
            <path d="M145 44 L133 66 L157 66 Z M145 66 L145 100 M145 82 L130 94 M145 82 L160 94 M145 100 L132 120 M145 100 L158 120" />
          </g>
        </motion.svg>

        <motion.svg
          className="nf-floater nf-dokra"
          viewBox="0 0 260 180"
          animate={{ y: [0, -12, 0], x: [0, -7, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M32 132 L78 86 L114 112 L148 72 L194 110 L230 82" />
          <circle cx="78" cy="82" r="6" />
          <circle cx="148" cy="68" r="6" />
          <path d="M20 148 H242" />
        </motion.svg>

        <div className="nf-bamboo-overlay" />
      </motion.div>

      <div className="nf-particles">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="nf-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -18, 10, 0],
              x: [0, 8, -6, 0],
              opacity: [0.1, 0.75, 0.25, 0.1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default NightFestivalBackdrop;

