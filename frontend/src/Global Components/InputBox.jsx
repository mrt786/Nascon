import React from "react";
import { motion } from "framer-motion";

const InputBox = ({ type, placeholder, bname, bvalue, change, req = false, category = true }) => (
  <motion.input
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    type={type}
    name={bname}
    value={bvalue}
    onChange={change}
    placeholder={placeholder}
    className="w-full p-2 rounded-md text-black placeholder-slate-400   focus:outline-none focus:ring-2"
    required={category}
    readOnly={req}
  />
);

export default InputBox;
