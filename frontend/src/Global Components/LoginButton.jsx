import React from "react";

const LoginButton = ({text, btype})=> (
    <>
        <button type = {btype}className="w-full bg-gradient-to-r from-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 to-pink-500 text-white py-2 rounded-md ">
            {text}
        </button>
    </>
);

export default LoginButton;