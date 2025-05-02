import React from "react";
import { motion } from "framer-motion";

const LoginButton = ({
  text,
  btype = "button",
  onClick,
  className = "",
}) => (
  <motion.button
    type={btype}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`
      w-full
      bg-gradient-to-r from-orange-500 to-pink-500
      hover:from-pink-500 hover:to-orange-500
      focus:outline-none focus:ring-2 focus:ring-pink-500
      text-white font-semibold
      py-2 rounded-md shadow-md
      transition-colors duration-300
      ${className}
    `}
  >
    {text}
  </motion.button>
);

export default LoginButton;
