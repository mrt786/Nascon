// Animations/PageWrapper.jsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:     { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function WholePageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: 'relative' }}   // ensure we don’t overlap pages
    >
      {children}
    </motion.div>
  );
}
