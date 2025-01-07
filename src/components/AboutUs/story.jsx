import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Pertamina1 from "../../assets/Lowongan-Pertamina.webp"
import Pertamina2 from "../../assets/promo-pertamina.webp"
import Pertamina3 from "../../assets/pertamina1.webp"
import AOS from 'aos';
import 'aos/dist/aos.css';
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
            <p className="mb-6 w-full md:max-w-[70%] lg:max-w-[50%] text-center mx-auto text-base md:text-lg lg:text-xl px-4 py-10 md:py-20">
                "[Your Company Name] specializes in consulting and providing products for gas stations (SPBU). 
                With years of experience, we are committed to delivering innovative and tailored solutions 
                to our partners in the energy and fuel industry.
                <br/><br />
                We not only offer high-quality products that meet industry 
                standards but also provide in-depth consulting services to help clients
                achieve operational efficiency and boost productivity."
            </p>

            {/* Vision & Mission Section */}
            <div className='bg-gradient-to-l from-primary to-pink-500 bg-opacity-85 py-6 md:py-10'>
                <div className='flex flex-col md:flex-row w-full max-w-[1500px] mx-auto gap-5 px-4 md:px-8 lg:px-16'>
                    {/* Vision Card */}
                    <div className='bg-white shadow-xl p-6 md:p-10 w-full md:w-1/2 hover:cursor-pointer rounded-xl' 
                         data-aos="fade-up" 
                         data-aos-delay="300">
                        <h1 className='text-2xl md:text-3xl font-bold mb-3'>Vision</h1>
                        <p className='hover:text-primary transition duration-300 text-base md:text-lg lg:text-xl'>
                            To become a trusted partner in delivering comprehensive solutions for gas station operations, supporting sustainable business growth.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className='bg-white shadow-xl p-6 md:p-10 w-full md:w-1/2 hover:cursor-pointer rounded-xl' 
                         data-aos="fade-up" 
                         data-aos-delay="800">
                        <h1 className='text-2xl md:text-3xl font-bold mb-3'>Mission</h1>
                        <ul className='hover:text-primary transition duration-300 text-base md:text-lg lg:text-xl space-y-2'>
                            <li>- To supply high-quality products that enhance gas station management efficiency.</li>
                            <li>- To offer professional consulting services to maximize clients business potential.</li>
                            <li>- To innovate and introduce the latest technologies and solutions in the gas station industry.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;