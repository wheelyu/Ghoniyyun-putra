import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import { supabase } from "../services/supabaseConfig";
import { Link } from "react-router-dom";

const Footer = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLink();
    }, []);

    const getLink = async () => {
        try {
            setIsLoading(false);
            const { data, error, status } = await supabase
                .from("link")
                .select("*");

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data);
                setData(data);
                setIsLoading(false);
            } else {
                throw new Error("Link not found");
            }
        } catch (error) {
            console.error("Error fetching link:", error.message);
        }
    };

    // Function to get the appropriate icon based on social media name
    const getIcon = (socialMedia) => {
        const socialMediaLower = socialMedia.toLowerCase();
        switch (socialMediaLower) {
            case 'facebook':
                return <FaFacebook />;
            case 'twitter':
                return <FaTwitter />;
            case 'instagram':
                return <FaInstagram />;
            case 'linkedin':
                return <FaLinkedin />;
            case 'youtube':
                return <FaYoutube />;
            case 'tiktok':
                return <FaTiktok />;
            default:
                return null;
        }
    };

    return (
        <footer className="bg-white text-black py-8">
            <hr className="w-[90%] mx-auto"/>
            <div className="container mx-auto px-5 md:px-48">
                <div className="container mx-auto flex flex-row justify-between items-center py-10">
                    {/* Social Media Icons */}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="flex space-x-6 mb-4">
                            {data.slice(1).map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-3xl text-gray-700 hover:text-primary transition-colors duration-300"
                                >
                                    {getIcon(item.name)}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="flex space-x-4 text-sm">
                        <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
                        <Link to="/Product" className="text-gray-700 hover:text-primary">Product</Link>
                        <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
                    </nav>
                </div>

                <hr/>
                <div className="text-center mt-8 text-sm text-gray-400">
                    PT. GHONIYYUN PUTRA © {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;