import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
        'bg.webp',
        'bg.webp',
        'bg.webp',
        'bg.webp',
        'bg.webp',
    ];
    return (
        <div className="py-28">
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
            className="w-[1500px] h-[500px] custom-swiper"
            >
            {images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center relative">
                {/* Dark overlay */}
                <div className="absolute inset-0 w-[90%] mx-auto bg-black opacity-60 z-10"></div>
                <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="max-w-[90%] object-cover rounded-xl z-0"
                />
                </SwiperSlide>  
            ))}
            </Swiper>
                <h1 className='text-7xl font-bold text-primary text-center relative  z-50 py-10 '>Our Story</h1>
                <p className=" mb-6 max-w-[50%] text-center mx-auto text-xl"  >
                "[Your Company Name] specializes in consulting and providing products for gas stations (SPBU). 
                With years of experience, we are committed to delivering innovative and tailored solutions 
                to our partners in the energy and fuel industry.
                <br/><br />
                We not only offer high-quality products that meet industry 
                    standards but also provide in-depth consulting services to help clients
                    achieve operational efficiency and boost productivity."
                </p>
                <div className='bg-primary py-10'>
                <div className='flex flex-row w-[1500px] mx-auto gap-5'>
                    <div className='bg-white shadow-xl p-10 w-1/2 hover:cursor-pointer rounded-xl' data-aos="fade-up" data-aos-delay="300">
                        <h1 className='text-3xl font-bold'>Vision</h1>
                        <p className='hover:text-primary transition duration-300 text-xl'>To become a trusted partner in delivering comprehensive solutions for gas station operations, supporting sustainable business growth.</p>
                    </div>
                    <div className='bg-white shadow-xl p-10 w-1/2 hover:cursor-pointer rounded-xl' data-aos="fade-up" data-aos-delay="800">
                        <h1 className='text-3xl font-bold'>Mission</h1>
                        <ul className='hover:text-primary transition duration-300 text-xl'>
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