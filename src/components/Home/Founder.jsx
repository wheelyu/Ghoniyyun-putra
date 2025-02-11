import React, { useEffect, useState } from "react";
import Particles from "../Particles";
import { supabase } from "../../services/supabaseConfig";
const Founder = () => {
    const [founders, setFounders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        
        fetchFounders();
    }, []);

    const fetchFounders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("founder")
            .select("*");
        if (error) {
            console.log(error);
        } else {
            console.log(data)
            setFounders(data);
        }
        setLoading(false);
    };
    return (
        <div className="w-full flex justify-center items-center bg-primary h-[300px] mt-10 px-4 relative">
        {loading ? (
          <p className="relative z-10 text-white">Loading...</p>
        ) : (
          <div className="relative lg:w-4/6 w-5/6 h-[600px] flex bg-white shadow-xl rounded-2xl lg:flex-row flex-col p-10">
            <img
              src={founders[0].image_url}
              alt="Mark"
              className="lg:w-1/3 w-full h-full object-cover lg:mb-0 mb-4 rounded-2xl"
            />
            <div className="flex flex-col w-full items-center justify-center">
              <h1 className="text-3xl font-bold mb-4 italic text-center">
                "{founders[0].quote}"
              </h1>
              <p className="text-lg text-center">{founders[0].name}</p>
            </div>
          </div>
        )}
      
        {/* Particles di atas card */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>
      
    );
};

export default Founder;