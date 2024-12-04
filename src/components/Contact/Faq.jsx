import React, { useEffect } from "react";
import Accordion from "./accordion";
import 'preline/preline';
import { HSStaticMethods } from 'preline';

const Faq = () => {
    useEffect(() => {
        // Initialize Preline accordion functionality
        HSStaticMethods.autoInit();
    }, []);

    const faqs = [
        {
        question: "Product apa saja yang kami jual?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        },
        {
            question: "Bagaimana cara membeli produk kami?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            },
        // Add more FAQs as needed
    ];

    return (
        <div className="bg-gray-100">
        <div className="justify-center items-start flex flex-col   w-full mx-auto">
            <div className=" flex flex-col justify-start items-start mx-auto w-fit bg-white z-50 p-10 rounded-3xl text-primary relative top-12  ">
                <h2 className="text-lg  text-[18px]">FAQ</h2>
                <h1 className="text-xl md:text-5xl text-[20px] md:text-[48px] font-semibold  mt-2">
                    Pertanyaan yang sering diajukan
                </h1>
            </div>
            <div className=" w-full bg-primary ">
            <div className="hs-accordion-group md:p-20">
                {faqs.map((faq, index) => (
                <div 
                    key={index}
                    className="hs-accordion border-b border-gray-200 w-[1500px] mx-auto"
                    id={`faq-accordion-${index}`}
                >
                    <Accordion question={faq.question} answer={faq.answer} index={index} />
                </div>
                ))}
            </div>
            </div>
        </div>  
        </div>
    );
};

export default Faq;