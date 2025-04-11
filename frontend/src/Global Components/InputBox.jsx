import React from "react";
// category is required or not
const InputBox = ({ type, placeholder, category = true }) => (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required = {category}
    />
  );

  
  export default InputBox