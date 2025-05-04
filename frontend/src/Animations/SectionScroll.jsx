import { motion } from "framer-motion";

export function Section({ children, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }} // Trigger when 20% of the component is in view
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`p-8  rounded-xl shadow-md mb-10 ${className}`} // Add custom className here
      style={style} 
    >
      {children}
    </motion.div>
  );
}
