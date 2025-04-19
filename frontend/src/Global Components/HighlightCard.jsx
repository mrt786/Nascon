import React from "react";

const Cards = ({ headingtext, text , imagepath}) => {
    return(
        <div className="bg-slate-900 rounded-lg shadow-lg p-6 text-center flex-row justify-center items-center">
            <h3 className="text-xl font-semibold text-orange-500 my-2">{headingtext}</h3>
            <p className="text-sm">{text}</p>
            <div className="flex justify-center items-center my-2 min-h-sm max-h-sm height-full ">
                <img src= {imagepath} />
            </div>
        </div>


    );
};
export default Cards;