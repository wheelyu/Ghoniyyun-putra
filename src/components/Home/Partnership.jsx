import React from "react";
import Pertamina from "../../assets/Pertamina_Logo.png";
const Partnership = () => {
    return (
        <div className=" py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-primary mb-4 mx-auto text-center">Partnership</h2>
                <div className="py-10 flex flex-row">
                    <img src={Pertamina} alt="Pertamina" className="w-[300px] mx-auto" />
                    <img src={Pertamina} alt="Pertamina" className="w-[300px] mx-auto" />
                    <img src={Pertamina} alt="Pertamina" className="w-[300px] mx-auto" />
                    <img src={Pertamina} alt="Pertamina" className="w-[300px] mx-auto" />
                </div>
            </div>  
        </div>
    );
};

export default Partnership;