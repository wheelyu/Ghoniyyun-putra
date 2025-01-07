import React from "react";
import Mark from "../../assets/mark.jpg";
const Founder = () => {
    return (
        <div className="w-full flex justify-center items-center bg-primary h-[300px] top-10">
            <div className="relative md:w-4/6 w-5/6 h-[600px] flex  bg-white shadow-xl rounded-2xl md:flex-row flex-col p-10">
                    <img src={Mark} alt="Mark" className="md:w-1/3 w-full h-full object-cover md:mb-0 mb-4 rounded-2xl" />
                    <div className="flex flex-col w-full items-center justify-center">
                        <h1 className="text-3xl font-bold mb-4 italic text-center">"It takes courage to grow up and become who you really are."</h1>
                        <p className="text-lg text-center">Co Founder of Ghoniyyun Putra</p>
                    </div>
            </div>
        </div>
    );
};

export default Founder;