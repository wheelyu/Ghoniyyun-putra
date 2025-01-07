import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHandshake, faAward } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []); // Added dependency array to prevent unnecessary re-runs

    const cardData = [
        {
            icon: faBullseye,
            iconColor: "text-blue-500",
            title: "Measurable Target",
            description: "We help you set clear and measurable goals to track your progress effectively."
        },
        {
            icon: faHandshake,
            iconColor: "text-green-500", 
            title: "Best Partnership",
            description: "Build strong and long-lasting partnerships with our expertise and support."
        },
        {
            icon: faAward,
            iconColor: "text-yellow-500",
            title: "High Commitment", 
            description: "Our team is committed to delivering the best results for your success."
        },
    ];

    return (
        <div className="bg-gradient-to-r from-primary to-pink-500 bg-opacity-85 py-16 md:py-32 px-4 h-fit w-full mx-auto flex flex-col items-center justify-center">
            <div className="w-full md:w-2/3 lg:w-1/3 mt-8 md:mt-0">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white">
                    Why Choose Us?
                </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full md:w-11/12 lg:w-10/12 mt-8 md:mt-12">
                {cardData.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-lg p-4 md:p-6 
                                flex flex-col sm:flex-row items-center
                                min-h-[180px] md:h-[200px]
                                transition-all duration-300 ease-in-out 
                                border-b-[10px] hover:border-primary 
                                hover:shadow-xl hover:cursor-pointer"
                    >
                        <FontAwesomeIcon 
                            icon={card.icon} 
                            className={`${card.iconColor} text-3xl md:text-4xl mb-4 sm:mb-0 sm:mr-8 md:mr-16 md:ml-10`} 
                        />
                        <div className="text-center sm:text-left">
                            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                                {card.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-2 max-w-sm">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;