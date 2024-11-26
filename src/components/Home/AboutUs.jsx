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
        }
    ];

    return (
        <div className="bg-gray-50 py-16 px-4 h-fit ">
            <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h1>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {cardData.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center 
                                    transition-all duration-300 ease-in-out 
                                    hover:border-b-4 hover:border-red-400 
                                    hover:shadow-xl hover:cursor-pointer"
                    >
                        <FontAwesomeIcon 
                            icon={card.icon} 
                            className={`${card.iconColor} text-4xl mb-4`} 
                        />
                        <p className="text-lg font-semibold text-gray-800">{card.title}</p>
                        <p className="text-sm text-gray-600 mt-2 pre-line">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;