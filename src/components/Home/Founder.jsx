import React, { useEffect, useState } from "react";
import Mark from "../../assets/mark.jpg";
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
        <div className="w-full flex justify-center items-center bg-primary h-[300px] top-10">
            {loading ? (
                <p>Loading...</p>
            ): (
            <div className="relative md:w-4/6 w-5/6 h-[600px] flex  bg-white shadow-xl rounded-2xl md:flex-row flex-col p-10">
                    <img src={founders[0].image_url} alt="Mark" className="md:w-1/3 w-full h-full object-cover md:mb-0 mb-4 rounded-2xl" />
                    <div className="flex flex-col w-full items-center justify-center">
                        <h1 className="text-3xl font-bold mb-4 italic text-center">"{founders[0].quote}"</h1>
                        <p className="text-lg text-center">{founders[0].name}</p>
                    </div>
            </div>
            )}
            
        </div>
    );
};

export default Founder;