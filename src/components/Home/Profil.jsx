import React from "react";
import VideoPlayer from "./VideoPlayer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Profil = ({ scrollToSection, contactRef }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center py-12 md:py-28 max-w-[1640px] mx-auto gap-6 md:gap-10 px-4 md:px-6">
            {/* Video Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-4 italic">
                    What we do
                </h1>
                <div className="w-full bg-white shadow-2xl">
                    <div className="aspect-w-16 aspect-h-9">
                        <VideoPlayer />
                    </div>
                </div>
            </div>

            {/* Text Content Section */}
            <div className="w-full md:w-1/2 md:pt-28">
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full md:w-[600px] min-h-[300px] md:h-[400px]">
                    <p className="mt-2 md:mt-4 mb-4 md:mb-6 text-justify text-sm md:text-base">
                    Ghoniyyun Petrol Teknik is a company specializing in providing innovative solutions and services in the oil and gas industry. Founded in early 2024, the company began as a small enterprise focusing on technical support and equipment maintenance for petroleum operations. Over the years, it expanded its portfolio to include engineering consultancy, installation of advanced technology systems, and supply chain services tailored to the energy sector.
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <a
                            onClick={() => scrollToSection(contactRef)}
                            className="inline-flex items-center font-bold text-primary hover:text-red-500 transition-colors duration-300 hover:underline hover:cursor-pointer"
                        >
                            Get in Touch 
                            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;