import React from "react";
import VideoPlayer from "./VideoPlayer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Profil = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center p-4 md:p-10 lg:p-28 lg:pb-0">
            <div className="w-full md:w-1/2 p-4 md:p-36 md:pl-10 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 italic">
                    What we do
                </h1>
                <div className="bg-white p-10 rounded-xl">
                <p className="mt-4 mb-6 text-justify text-sm md:text-base">
                Our website is your one-stop destination for top-quality products and services designed 
                to meet your needs. Whether youre looking for innovative solutions, reliable tools, or 
                expert support, weve got you covered. With a focus on quality, convenience, and customer 
                satisfaction, we aim to make your experience seamless and rewarding. Explore our offerings and 
                discover how we can help bring your ideas to life!</p>
                <div className="flex justify-center md:justify-start">
                    <a 
                        href="#" 
                        className="inline-flex items-center font-bold text-red-600 hover:text-red-500 transition-colors duration-300"
                    >
                        See more 
                        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                    </a>
                </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-0 h-full">
                <div className="aspect-w-16 aspect-h-12">
                    <VideoPlayer />
                </div>
            </div>
        </div>
    );
};

export default Profil;