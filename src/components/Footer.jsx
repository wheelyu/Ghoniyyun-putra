import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-black py-8">
        <div className="container mx-auto px-5 md:px-48">
            <div className="flex flex-col md:flex-row justify-between items-center mb-5">
            {/* Nama Perusahaan */}
            <div className="mb-4 md:mb-0">
                <h1 className="text-xl font-bold">PT. GHONIYYUN PUTRA </h1>
                <p className="text-sm text-gray-400 mt-1"><FontAwesomeIcon icon={faLocationDot  } /> Jl. Raya No. 123, Kota, Provinsi, 12345</p>
                <p className="text-sm text-gray-400 mt-1"><FontAwesomeIcon icon={faEnvelope} /> info@perusahaan.com</p>
                <p className="text-sm text-gray-400 mt-1"><FontAwesomeIcon icon={faPhone} /> +62 123 4567 890</p>
            </div>

            {/* Alamat */}
            <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold">Jelajahi</h2>
                <div className="flex flex-col">
                <Link to="/" className="text-sm text-gray-400 mt-1 hover:text-red-400">
                Home
                </Link>
                <Link to="/product" className="text-sm text-gray-400 mt-1 hover:text-red-400">
                Product
                </Link>
                <Link to="/product" className="text-sm text-gray-400 mt-1 hover:text-red-400">
                Contact
                </Link>
                </div>
            </div>

            {/* Kontak */}
            <div>
                <h2 className="text-lg font-semibold">Social Media</h2>
                <div className="flex space-x-4 mt-2">
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400"
                >
                    <FaTwitter />
                </a>
                <a
                    href="https://www.facebook.com/"    
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400"
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"    
                    className="text-gray-400 hover:text-red-400"
                >
                    <FaLinkedin />
                </a>
                </div>
            </div>
            </div>

            {/* Copyright */}
            <hr></hr>
            <div className="text-center mt-8  text-sm text-gray-400">
                
            PT. GHONIYYUN PUTRA © {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
        </footer>
    );
};

export default Footer;
