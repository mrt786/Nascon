import React from 'react';
import { motion } from 'framer-motion';

const SimpleButton = ({
  type = 'button',
  onClick,
  className = '',
  width = 'min-w-40 max-w-sm',
  text,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-gradient-to-r from-orange-500 to-pink-500
      hover:from-pink-500 hover:to-orange-500
      focus:outline-none focus:ring-2 focus:ring-pink-500
      text-white font-semibold
      py-2 rounded-md shadow-md
      transition-colors duration-300 ${className} ${width}`.trim()}
    >
      {text}
    </motion.button>
  );
};

export default SimpleButton;
