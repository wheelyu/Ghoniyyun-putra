import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHandshake, faAward } from "@fortawesome/free-solid-svg-icons";

const About = () => {
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
        <div className=" bg-gradient-to-r from-red-500 to-pink-500 bg-opacity-85 py-32 px-4 h-fit w-full mx-auto flex flex-col md:flex-row items-center justify-center">
            <div 
                className="grid grid-cols-1 gap-8 w-full md:w-1/3 md:pr-12 items-center"
            >
                {cardData.map((card, index) => (
                <div 
                    key={index} 
                    className="bg-white shadow-lg rounded-lg p-6 flex flex-row items-center h-[200px]
                            transition-all duration-300 ease-in-out 
                            border-s-[10px] hover:border-red-400 
                            hover:shadow-xl hover:cursor-pointer"
                >
                    <FontAwesomeIcon 
                    icon={card.icon} 
                    className={`${card.iconColor} text-4xl mr-16 ml-10`} 
                    />
                    <div className="text-left  items-center justify-center">
                        <p className="text-3xl font-semibold text-gray-800">{card.title}</p>
                        <p className="text-sm text-gray-600 mt-2 pre-line">
                        {card.description}
                        </p>
                    </div>
                </div>
                ))}
            </div>
            
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
                <h1 className="text-7xl font-bold text-center text-white">
                    Why Choose Us?
                </h1>
            </div>
        </div>

    );
};

export default About;