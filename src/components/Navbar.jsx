import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faInfoCircle, faBox, faTools, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../assets/Logo_company.png";

const Navbar = ({active}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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

    const scrollToContact = (e) => {
        e.preventDefault();
        // Jika berada di halaman Home, scroll ke bagian Contact
        if (location.pathname === '/') {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        } else {
            // Jika berada di halaman lain, arahkan ke Home dan tambahkan hash #contact
            window.location.href = '/#contact-section';
        }
    };
    const scrollToAbout = (e) => {
        e.preventDefault();
        // Jika berada di halaman Home, scroll ke bagian Contact
        if (location.pathname === '/') {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        } else {
            // Jika berada di halaman lain, arahkan ke Home dan tambahkan hash #contact
            window.location.href = '/#about-section';
        }
    }
    const scrollToService = (e) => {
        e.preventDefault();
        // Jika berada di halaman Home, scroll ke bagian Contact
        if (location.pathname === '/') {
            const serviceSection = document.getElementById('service-section');
            if (serviceSection) {
                serviceSection.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        } else {
            // Jika berada di halaman lain, arahkan ke Home dan tambahkan hash #contact
            window.location.href = '/#service-section';
        }
    }
    const navLinks = [
        { id: 1, to: "/",          label: "Home",      icon: faHome,       active: active === "Home", action: null },
        {id: 2, to: "#about-section", label: "About Us", icon: faInfoCircle, active: active === "About Us", action: scrollToAbout },
        { id: 3, to: "/Product",   label: "Product",   icon: faBox,        active: active === "Product", action: null },
        {id: 4, to: "#service-section", label: "Service", icon: faTools, active: active === "Service", action: scrollToService },
        { id: 5, to: "#contact-section", label: "Contact", icon: faPhone,  active: active === "Contact", action: scrollToContact },
        
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
                <div className={`text-base font-bold  md:bg-white md:text-primary  md:rounded-xl transition-all duration-300   ${isScrolled ? "text-primary md:text-2xl md:p-3" : "text-white md:text-5xl md:p-8"}`}>
                    Ghoniyyun Petrol Teknik 
                </div>
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.to}
                            onClick={link.action}
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
                        </a>
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
                                ? "bg-white shadow-md top-5 -z-10 rounded-xl border-b-8 border-primary" 
                                : "bg-primary bg-opacity-70 border-b-8 border-primary "
                        }`}
                    >
                        <div className="flex flex-col space-y-4 p-4 mt-10">
                        {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.to}
                            onClick={link.action}
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
                        </a>
                    ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;