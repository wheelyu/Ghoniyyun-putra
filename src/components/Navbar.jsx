import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faInfoCircle, faBox, faTools, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { to: "/", label: "Home", icon: faHome },
        { to: "#", label: "About Us", icon: faInfoCircle },
        { to: "/Product", label: "Product", icon: faBox },
        { to: "#", label: "Services", icon: faTools },
        { to: "#", label: "Contact", icon: faEnvelope },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
                isScrolled ? "bg-white shadow-md" : "bg-gradient-to-b from-black to-transparent"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between p-4 md:p-6 lg:p-10 font-bold">
                {/* Logo */}
                <div className={`text-xl font-bold transition-colors ${isScrolled ? "text-black" : "text-white"}`}>
                    <Link to="/">LOGO GP</Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-2 rounded transition flex items-center space-x-2 ${
                                isScrolled 
                                    ? "text-black hover:bg-gray-200" 
                                    : "text-white hover:text-red-400"
                            }`}
                        >
                            
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMobileMenu}
                        className={`focus:outline-none ${
                            isScrolled ? "text-black" : "text-white"
                        }`}
                    >
                        <FontAwesomeIcon 
                            icon={isMobileMenuOpen ? faTimes : faBars} 
                            className="text-2xl"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div 
                    className={`md:hidden absolute  left-0 w-full transition-all duration-300 ${
                        isScrolled 
                            ? "bg-white shadow-md" 
                            : "bg-black bg-opacity-90"
                    }`}
                >
                    <div className="flex flex-col space-y-4 p-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={toggleMobileMenu}
                                className={`w-full  py-3 rounded transition  space-x-2 ${
                                    isScrolled 
                                        ? "text-black hover:bg-gray-200" 
                                        : "text-white hover:bg-gray-800"
                                }`}
                            >
                                <FontAwesomeIcon icon={link.icon} className="mx-4"/>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;