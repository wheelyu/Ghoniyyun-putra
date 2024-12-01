import React from "react";
import VideoPlayer from "./VideoPlayer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Profil = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center p-4 md:p-10 lg:p-28 lg:pb-0">
            <div className="w-full md:w-1/2 p-4 md:p-10 md:pl-0 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 italic">
                    What we do
                </h1>
                <div className="bg-white p-10 rounded-xl">
                <p className="mt-4 mb-6 text-justify text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minus dolor expedita sequi magnam, distinctio, provident inventore quidem, est vero repudiandae tempora officia numquam eveniet quas! Rerum doloremque aliquam magni deserunt! Quod, pariatur ipsa iste repellendus tempora at molestiae iure numquam, dignissimos, repellat quis totam provident animi praesentium ad consectetur.
                </p>
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
            <div className="w-full md:w-1/2 p-4 md:p-0">
                <div className="aspect-w-16 aspect-h-9">
                    <VideoPlayer />
                </div>
            </div>
        </div>
    );
};

export default Profil;