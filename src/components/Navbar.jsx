import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faInfoCircle, faBox, faTools, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../assets/Logo_company.png";
const Navbar = ({active}) => {
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
        { id: 1, to: "/",          label: "Home",      icon: faHome,       active: active === "Home" },
        { id: 2, to: "/Product",   label: "Product",   icon: faBox,        active: active === "Product" },
    ];

    return (
        <nav
            className={`fixed  transition-all duration-500 z-50 mx-auto w-full top-0  ${
                isScrolled 
                    ? "bg-white shadow-lg py-3  border-b-[4px] border-primary" 
                    : "  rounded-none  border-transparent"
            }`}
        >
            <div className={`container mx-auto flex items-center justify-between transition-all duration-300 z-50 ${
                isScrolled ? "p-3 md:p-4" : "p-4 md:p-6 lg:p-10"
            } font-bold`}>
                {/* Logo */}
                <div className={`text-xl font-bold transition-colors ${
                    isScrolled ? "text-black" : "text-white"
                }`}>
                    <Link to="/"><img src={Logo} alt="Logo" className={`${isScrolled ? "h-12" : "md:h-20 h-16"} rounded-xl transition-all duration-300`} /></Link>
                </div>
                <div className={`text-xl font-bold transition-colors md:hidden ${isScrolled ? "text-primary" : "text-white"}`}>
                    Ghoniyyun Petrol
                </div>
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`
                                px-4 py-2 rounded transition 
                                flex items-center space-x-2 
                                ${link.active 
                                    ? "bg-primary text-white" 
                                    : isScrolled 
                                        ? "text-gray-800 hover:bg-gray-200" 
                                        : "text-white hover:bg-white/20"
                                }
                            `}
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
                            isScrolled ? "text-primary" : "text-white"
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
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            height: 'auto', 
                            opacity: 1 
                        }}
                        exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                ease: "easeInOut"
                            }
                        }}
                        className={`md:hidden absolute left-0 w-full overflow-hidden ${
                            isScrolled 
                                ? "bg-white shadow-md top-5 -z-10 rounded-xl" 
                                : "bg-black bg-opacity-90 "
                        }`}
                    >
                        <div className="flex flex-col space-y-4 p-4 mt-10">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { 
                                            delay: index * 0.1,
                                            type: "spring",
                                            stiffness: 300
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -20,
                                        transition: {
                                            duration: 0.2
                                        }
                                    }}
                                >
                                    <Link
                                        to={link.to}
                                        onClick={toggleMobileMenu}
                                        className={`w-full py-3 rounded transition space-x-2 flex items-center ${
                                            isScrolled 
                                                ? "text-black hover:bg-gray-200" 
                                                : "text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={link.icon} className="mx-4"/>
                                        <span>{link.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;