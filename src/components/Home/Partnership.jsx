import React, { useEffect, useState } from "react";
import Pertamina from "../../assets/Pertamina_Logo.png";
import Marquee from "react-fast-marquee";
import { supabase } from "../../services/supabaseConfig";
const Partnership = () => {
    const [partnerImages, setPartnerImages] = useState([]);

    const fetchPartnerImages = async () => {
        const { data, error } = await supabase
            .from("partnership")
            .select("image_url")
            .order("id", { ascending: true })
            .eq("is_active", true);
        setPartnerImages(data);
    };

    useEffect(() => {
        fetchPartnerImages();
    }, []);
    return (
        <div className="py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-primary mb-4 mx-auto text-center">
                    Partnership
                </h2>
                <div className="py-10">
                    <Marquee speed={50} gradient={false}>
                        {partnerImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.image_url}
                                alt={`Partner ${index + 1}`}
                                className="w-40 h-40 object-contain mr-10"
                            />
                        ))}
                        
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default Partnership;
