import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Accordion = ({ question, answer, index }) => {
    return (
        <div className="md:p-5">
            <button
                className="hs-accordion-toggle hs-accordion-active:text-white py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-white hover:text-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                aria-controls={`faq-panel-${index}`}
            >
                <span className="text-3xl">{question}</span>
                <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className="hs-accordion-active:hidden block w-4 h-4" 
                />
                <FontAwesomeIcon 
                    icon={faChevronUp} 
                    className="hs-accordion-active:block hidden w-4 h-4" 
                />
            </button>
            <div
                id={`faq-panel-${index}`}
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby={`faq-accordion-${index}`}
            >
                <p className="text-white text-xl">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default Accordion;