import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHandshake, faAward } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import TextPressure from "../TextPressure";
import SpotlightCard from "../SpotlightCard";
const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []); // Added dependency array to prevent unnecessary re-runs

    const cardData = [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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
        <div className="bg-gradient-to-r from-primary to-pink-500 bg-opacity-85 py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 w-full mx-auto">
    {/* Header */}
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-center text-whit">
        <div className="relative lg:h-[200px] h-[80px]">
            <TextPressure
            text="Why Choose us?"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
            />
            </div>
        </h1>
    </div>
    
    {/* Cards Grid - Always 3 columns */}
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-6 
                    w-full max-w-7xl 
                    mx-auto mt-4 sm:mt-6 md:mt-8">
        {cardData.map((card, index) => (
            <div>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(220, 38, 38, 1)">   
            <div 
                key={card.id} 
                className="bg-white 
                          transition-all duration-300 ease-in-outhover:cursor-pointer
                          group"
            >
                {/* Icon Container */}
                <div className="w-full flex justify-center md:justify-start mb-2 md:mb-4">
                    <FontAwesomeIcon 
                        icon={card.icon} 
                        className={`${card.iconColor} text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                  transition-transform duration-300
                                  group-hover:scale-110`}
                    />
                </div>

                {/* Content Container */}
                <div className="w-full">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl
                                 font-semibold text-gray-800 
                                 text-center md:text-left 
                                 mb-1 sm:mb-2 md:mb-3">
                        {card.title}
                    </h3>
                    <ul className="text-xs sm:text-sm md:text-base text-gray-600 
                                 space-y-1 md:space-y-2
                                 list-disc pl-3 md:pl-4">
                        {card.description.map((desc, index) => (
                            <li key={index} className="text-justify">
                                {desc}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </SpotlightCard>
            </div>
        ))}
    </div>
</div>
    );
};

export default About;