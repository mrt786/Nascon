import React from 'react';

const SimpleButton= ({ type = 'button', onClick , className = 'bg-gradient-to-r from-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 to-pink-500 text-white py-2 rounded-md', width = "min-w-40 max-w-sm", text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${width}`.trim()}
    >
      {text}
    </button>
  );
};

export default SimpleButton;
