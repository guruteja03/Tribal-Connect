import { motion } from 'framer-motion';
import { pageTransition } from './MotionPresets';

function AnimatedPage({ children, className = '' }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`animated-page ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;

