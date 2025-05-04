import { motion } from "framer-motion";

const AnimatedForm = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slide down
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      exit={{ opacity: 0, y: -50 }} // Fade out and slide up
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      className="bg-slate-900 rounded-2xl shadow-xl p-8 min-w-[350px] border border-orange-500"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedForm;