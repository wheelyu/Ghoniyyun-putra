import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Pertamina1 from "../../assets/Lowongan-Pertamina.webp"
import Pertamina2 from "../../assets/promo-pertamina.webp"
import Pertamina3 from "../../assets/pertamina1.webp"
import AOS from 'aos';
import 'aos/dist/aos.css';
import  TypeIt  from './typeIt';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AboutUs = () => {
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const images = [
        Pertamina1,
        Pertamina2,
        Pertamina3,
        Pertamina1,
        Pertamina2,
    ];

    return (
        <div className="pt-24 md:pt-48 pb-6 md:pb-10">
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-center relative mt-20 md:mt-0 py-6 md:py-10'>
                Our Story
            </h1>

            {/* Swiper Container */}
            <div className="w-full px-4 md:px-8 lg:px-16">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    loop={true} 
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="w-full max-w-[1500px] h-[300px] md:h-[400px] lg:h-[500px] mx-auto custom-swiper mb-6 md:mb-10"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center relative">
                            {/* Dark overlay */}
                            <div className="absolute inset-0 w-[90%] mx-auto  z-10"></div>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover object-center rounded-xl z-0 "
                            />
                        </SwiperSlide>  
                    ))}
                </Swiper>
            </div>

            {/* Description Text */}
            <div className="mb-6 w-full md:max-w-[70%] lg:max-w-[50%] text-center mx-auto text-base md:text-lg lg:text-xl px-4 py-10 md:py-20 h-[300px]"  data-aos="fade-up">
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