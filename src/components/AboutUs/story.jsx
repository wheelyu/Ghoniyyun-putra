import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Bg from '../../assets/bg_our_story.jpg'
import AOS from 'aos';
import FlipCard from "../FlipCard";
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
        <div className="pt-24 lg:pt-48 md:pt-40">
            <div className="bg-cover bg-center  bg-no-repeat bg-black bg-opacity-20 w-full flex flex-col justify-center h-[800px] "
                        style={{
                            backgroundImage: `url(${Bg})`,
                            backgroundBlendMode: 'overlay'
                        }}>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center relative mt-20 md:mt-0 py-6 lg:py-10 '>
                Our Story
            </h1>
            {/* Description Text */}
            <div className="mb-20 w-full md:max-w-[80%] lg:max-w-[60%] text-center mx-auto text-base md:text-lg lg:text-xl px-4 py-10  lg:py-20 min-h-[300px] bg-white bg-opacity-95 rounded-xl"  data-aos="fade-up">
            <TypeIt />
            </div>
            </div>
            {/* Vision & Mission Section */}
            
        </div>
    );
};

export default AboutUs;