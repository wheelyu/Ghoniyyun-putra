import React from "react";
import VideoPlayer from "./VideoPlayer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Profil = ({ scrollToSection, contactRef}) => {
    return (
        <div className=" flex flex-row  justify-center py-28 max-w-[1640px]  mx-auto gap-10     ">
            <div className="w-full md:w-1/2 p-4 md:p-0 md:pl-0 text-center md:text-left">
                <h1 className="text-3xl md:text-7xl font-bold mb-4 italic">
                    What we do
                </h1>
                <div className="w-full bg-white shadow-2xl">
                    <div className="aspect-w-16 aspect-h-6">
                        <VideoPlayer />
                    </div>
                </div>
            </div>
            <div className="pt-28">
                <div className="bg-white p-10 rounded-xl shadow-lg w-[600px] h-[400px]">
                    <p className="mt-4 mb-6 text-justify text-sm md:text-base">
                    Our website is your one-stop destination for top-quality products and services designed 
                    to meet your needs. Whether youre looking for innovative solutions, reliable tools, or 
                    expert support, weve got you covered. With a focus on quality, convenience, and customer 
                    satisfaction, we aim to make your experience seamless and rewarding. Explore our offerings and 
                    discover how we can help bring your ideas to life!</p>
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