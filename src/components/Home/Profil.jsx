import React from "react";
import VideoPlayer from "./VideoPlayer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import RotatingText from "../RotatingText";
const Profil = ({ scrollToSection, contactRef }) => {
    return (
        <div>
            <div className="border-t-primary border-t-[10px] lg:p-20 p-5">
                <div className="flex flex-row lg:gap-5 gap-2 text-primary font-bold 
                        text-xl sm:text-3xl md:text-5xl lg:text-7xl 
                        w-full  justify-center 
                        mx-auto leading-tight relative 
                        px-2 sm:px-4 ">
                Your 
                <RotatingText
                    texts={['Trusted', 'Reliable', 'Dedicated', 'Innovative']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg "
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    /> 
                Partner 
                </div>
                <div className="font-bold 
                        text-xl sm:text-3xl md:text-5xl lg:text-7xl w-full  justify-center  mx-auto leading-tight flex">
                    In Fuel Retail
                </div>
            </div>
        <div className="flex flex-col lg:flex-row justify-center py-8 sm:py-12 lg:py-28 max-w-[1640px] mx-auto gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-6">
    {/* Video Section */}
    <div className="w-full lg:w-1/2 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 italic">
            What we do
        </h1>
        <div className="w-full bg-white shadow-lg sm:shadow-xl rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
                <VideoPlayer />
            </div>
        </div>
    </div>

    {/* Text Content Section */}
    <div className="w-full lg:w-1/2 mt-6 md:mt-0 md:pt-20 lg:pt-28">
        <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-xl shadow-lg w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
            <p className="mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-5 md:mb-6 text-justify text-sm sm:text-base lg:text-lg">
                Ghoniyyun Petrol Teknik is a company specializing in providing innovative solutions and services in the oil and gas industry. Founded in early 2024, the company began as a small enterprise focusing on technical support and equipment maintenance for petroleum operations. Over the years, it expanded its portfolio to include engineering consultancy, installation of advanced technology systems, and supply chain services tailored to the energy sector.
            </p>
            <div className="flex justify-center md:justify-start mt-4 sm:mt-6">
                <a
                    onClick={() => scrollToSection(contactRef)}
                    className="inline-flex items-center font-bold text-primary hover:text-red-500 transition-colors duration-300 hover:underline hover:cursor-pointer text-sm sm:text-base lg:text-lg"
                >
                    Get in Touch 
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </a>
            </div>
        </div>
    </div>
</div>
</div>
    );
};

export default Profil;