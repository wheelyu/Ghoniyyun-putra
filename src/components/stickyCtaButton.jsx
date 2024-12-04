// StickyCtaButton.js
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
const StickyCtaButton = ({ onClick }) => {
    return (
        <button
        onClick={onClick}
        className="fixed bottom-4 right-4 px-6 py-6 bg-white text-green-400 rounded-full shadow-lg hover:bg-green-400 hover:text-white transition-colors duration-300 z-50"
        >
        <FaWhatsapp size={24} />
        </button>
    );
    };

export default StickyCtaButton;