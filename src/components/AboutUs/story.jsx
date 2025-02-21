import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import AOS from 'aos';
import 'aos/dist/aos.css';
import  TypeIt  from './typeIt';
// Import Swiper styles


const AboutUs = () => {
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);


    return (
        <div className="pt-24 lg:pt-48 md:pt-40 pb-6 lg:pb-10">
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-center relative mt-20 md:mt-0 py-6 lg:py-10'>
                Our Story
            </h1>

            {/* Swiper Container */}
            

            {/* Description Text */}
            <div className="mb-20 w-full md:max-w-[80%] lg:max-w-[60%] text-center mx-auto text-base md:text-lg lg:text-xl px-4 py-10  lg:py-20 h-[300px]"  data-aos="fade-up">
            <TypeIt />
            </div>

            {/* Vision & Mission Section */}
            <div className='bg-gradient-to-l from-primary to-pink-500 bg-opacity-85 py-6 md:py-10'>
                <div className='flex flex-col md:flex-row w-full max-w-[1500px] mx-auto gap-5 px-4 md:px-8 lg:px-16'>
                    {/* Vision Card */}
                    <div className='bg-white shadow-xl p-6 md:p-10 w-full md:w-1/2 hover:cursor-pointer rounded-xl' 
                         data-aos="fade-up" 
                         data-aos-delay="300">
                        <h1 className='text-2xl md:text-3xl font-bold mb-3'>Vision</h1>
                        <p className='hover:text-primary transition duration-300 text-base md:text-lg lg:text-xl'>
                        To be a leading company in the oil and gas industry, recognized for innovation, quality, and dedication to creating value for our clients, employees, and communities
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className='bg-white shadow-xl p-6 md:p-10 w-full md:w-1/2 hover:cursor-pointer rounded-xl' 
                         data-aos="fade-up" 
                         data-aos-delay="800">
                        <h1 className='text-2xl md:text-3xl font-bold mb-3'>Mission</h1>
                        <ul className='hover:text-primary transition duration-300 text-base md:text-lg lg:text-xl space-y-2'>
                            <li>- To provide top-tier products and services that meet the evolving needs of our clients.</li>
                            <li>- To foster a culture of innovation and continuous improvement in all aspects of our business.</li>
                            <li>- To establish long-term relationships with stakeholders based on trust, integrity, and mutual success.</li>
                            <li>- To prioritize sustainability and social responsibility in all operations, contributing positively to the environment and society.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;