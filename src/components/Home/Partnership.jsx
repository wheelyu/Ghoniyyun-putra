import React, { useEffect, useState } from "react";
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

    // Split the images into two groups
    const firstHalf = partnerImages.slice(0, Math.ceil(partnerImages.length / 2));
    const secondHalf = partnerImages.slice(Math.ceil(partnerImages.length / 2));

    return (
        <div className="py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-primary mb-4 mx-auto text-center">
                    Partnership
                </h2>
                <div className="py-10 space-y-8">
                    {/* First row - scrolling right */}
                    <Marquee speed={50} gradient={false} direction="left">
                        {firstHalf.map((image, index) => (
                            <img
                                key={index}
                                src={image.image_url}
                                alt={`Partner ${index + 1}`}
                                className="w-40 h-40 object-contain mr-20"
                            />
                        ))}
                    </Marquee>

                    {/* Second row - scrolling left */}
                    <Marquee speed={50} gradient={false} direction="right">
                        {secondHalf.map((image, index) => (
                            <img
                                key={index + firstHalf.length}
                                src={image.image_url}
                                alt={`Partner ${index + firstHalf.length + 1}`}
                                className="w-40 h-40 object-contain mr-20"
                            />
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default Partnership;