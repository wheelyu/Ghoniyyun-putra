import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok,  } from 'react-icons/fa';
import { supabase } from "../services/supabaseConfig";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo_company.png";

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
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <img src={Logo} alt="Company Logo" className="h-16 w-16 mr-3" />
                    <h3 className="text-2xl font-bold text-primary">PT. GHONIYYUN PUTRA</h3>
                </div>
                <p className="text-gray-600">We are committed to providing the best solutions for your needs.</p>
                <div className="space-y-2">
                    <p className="flex ">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-primary" />
                        <span>Jl. Bunga Mayang No.38, RT.1/RW.1, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12330</span>
                    </p>
                </div>
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
                    <nav className="flex space-x-6 text-sm">
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors duration-300">Beranda</Link>
                        <Link to="/Product" className="text-gray-700 hover:text-primary transition-colors duration-300">Produk</Link>
                        <Link to="/login" className="text-gray-700 hover:text-primary transition-colors duration-300">Login</Link>
                    </nav>
            </div>

            {/* Google Map */}
            <div className="md:col-span-2 h-64 rounded-lg overflow-hidden shadow-md">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.976311855049!2d106.7641883!3d-6.2668456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f053f11cab95%3A0x75eb702aea65ada8!2sFerdian%20Agency!5e0!3m2!1sen!2sid!4v1740990290033!5m2!1sen!2sid" 
                    className="w-full h-full"
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

        {/* Social Media and Quick Links */}
       

        <hr className="my-6"/>
        <div className="text-center text-sm text-gray-500">
            <p>PT. GHONIYYUN PUTRA © {new Date().getFullYear()} All rights reserved.</p>
        </div>
    </div>
    </footer>
    );
};

export default Footer;