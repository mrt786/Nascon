import React from "react";
// category is required or not
const InputBox = ({ type, placeholder, bname, bvalue, change,req = false,  category = true }) => (
    <input
      type={type}
      name = {bname}
      value = {bvalue}
      onChange={change}
      placeholder={placeholder}
      className="w-full p-2 rounded-md text-black placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      required = {category}
      readOnly = {req}
    />
  );


  
  export default InputBox