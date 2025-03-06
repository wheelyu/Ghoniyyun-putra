import React, { useEffect, useState } from "react";
import Particles from "../Particles";
import { supabase } from "../../services/supabaseConfig";
import Managed from "./managed";

const Founder = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("founder")
        .select("*");
      
      if (error) {
        console.error("Error fetching founders:", error);
      } else {
        setFounders(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-primary min-h-screen  px-4 relative">
      {loading ? (
        <p className="relative z-10 text-white">Loading...</p>
      ) : (
        <div className="w-full max-w-[1600px]  mx-auto bg-white shadow-xl rounded-2xl p-4 md:p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              {founders.length > 0 && (
                <div className="flex flex-col items-center">
                  <img
                    src={founders[0].image_url}
                    alt={founders[0].name}
                    className="w-full h-[500px] object-cover rounded-xl lg:rounded-2xl mb-4"
                  />
                  <div className="text-center mt-4">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 italic">
                      "{founders[0].quote}"
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg">
                      {founders[0].name}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-1/2">
              <Managed />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Founder;