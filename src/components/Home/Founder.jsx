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
            setFounders(data);
        }
        setLoading(false);
    };
    return (
        <div className="w-full flex justify-center items-center bg-primary h-[300px] mt-10 px-4 relative">
        {loading ? (
          <p className="relative z-10 text-white">Loading...</p>
        ) : (
          <div className="relative w-11/12 md:w-5/6 lg:w-4/6 mx-auto min-h-[400px] md:h-[500px] lg:h-[600px] flex bg-white shadow-xl rounded-2xl flex-col lg:flex-row p-4 md:p-6 lg:p-10">
      <img
        src={founders[0].image_url}
        alt={founders[0].name}
        className="w-full lg:w-1/2 h-48 md:h-64 lg:h-full object-cover mb-4 lg:mb-0 rounded-xl lg:rounded-2xl"
      />
      <div className="flex flex-col w-full lg:w-1/2 mx-auto items-center justify-center lg:pl-8">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 italic text-center">
          "{founders[0].quote}"
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-center">
          {founders[0].name}
        </p>
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