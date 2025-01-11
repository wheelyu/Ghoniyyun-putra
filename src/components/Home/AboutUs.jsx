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
            description:[
                "Maintain a customer satisfaction score of 90% or higher based on regular feedback surveys.",
                "We provide our clients with high-quality products.",
                "We innovate to become a national supplier across various regions in Indonesia."
            ]
        },
        {
            icon: faHandshake,
            iconColor: "text-green-500", 
            title: "Best Partnership",
            description:[
                "Partner with leading manufacturers and suppliers of petroleum equipment to ensure high-quality and cost-effective solutions",
                "Build strong relationships with international companies to exchange knowledge and enhance service offerings.",
                "Collaborate with Pertamina to support the digitalization program of gas stations in this digital era."
            ]
        },
        {
            icon: faAward,
            iconColor: "text-yellow-500",
            title: "High Commitment", 
            description:[
                "Maintain open communication with clients to ensure their needs are met promptly and effectively, fostering long-term relationships.",
                "Commit to maintaining the highest quality standards in all services and products provided to clients.",
            ]
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
                                min-h-[180px] 
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
                            <p className="text-sm text-gray-600 mt-2 max-w-sm text-justify">
                                {card.description.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;