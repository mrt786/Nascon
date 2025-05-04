import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
