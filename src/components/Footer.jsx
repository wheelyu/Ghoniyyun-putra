import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { supabase } from "../services/supabaseConfig";
import { Link } from "react-router-dom";
const Footer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getLink();
    }, []);

    const getLink = async () => {
        try {
            const { data, error, status } = await supabase
                .from("link")
                .select("*")


            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data)
                setData(data);
            } else {
                throw new Error("Link not found");
            }
        } catch (error) {
            console.error("Error fetching link:", error.message);
        }
            }
    const social = [
        {
            icon: <FaFacebook />,
            link: data[2].link,
            color: "hover:text-[#3b5998]",
        },
        {
            icon: <FaTwitter />,
            link: data[3].link,
            color: "hover:text-[#1da1f2]",
        },
        {
            icon: <FaInstagram />,
            link: data[1].link,
            color: "hover:text-[#c13584]",
        },

    ]
    return (
        <footer className="bg-white  text-black py-8">
            <hr className="w-[90%] mx-auto"/>
        <div className="container mx-auto px-5 md:px-48">
            <div className="container mx-auto flex flex-col items-center py-10">
        {/* Social Media Icons */}
                <div className="flex space-x-6 mb-4">
                    {social.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-3xl   text-gray-700 ${item.color} bg-white p-4 rounded-full`}
                        >
                            <span className="sr-only">{item.icon}</span>
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-4 text-sm">
                <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
                <Link to="/Product" className="text-gray-700 hover:text-primary">Product</Link>
                <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
                </nav>
            </div>

            <hr/>
            <div className="text-center mt-8  text-sm text-gray-400">
            PT. GHONIYYUN PUTRA © {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
        </footer>
    );
};

export default Footer;
