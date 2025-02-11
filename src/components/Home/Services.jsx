import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { supabase } from "../../services/supabaseConfig";

const Services = () => {
    const [services, setServices] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getServices = async () => {
        try {
            const { data, error } = await supabase
                .from('service')
                .select('*')
                .eq('is_active', true);
            if (error) {
                throw error;
            }
            setServices(data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    const overlayVariants = {
        initial: {
            backgroundColor: "rgba(220, 38, 38, 0.2)",
            transition: { duration: 0.5 },
            padding: "1rem"
        },
        hover: {
            backgroundColor: "rgba(220, 38, 38, 0.9)",
            padding: "1.5rem",
            transition: { duration: 0.5 },
            cursor: "pointer"
        }
    };
    const descriptionVariants = {
        initial: { 
            opacity: 0, 
            y: 10,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0,
            y: 10,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };
    return (
        <div className="bg-white bg-opacity-90 mb-56 sm:mb-32 md:mb-56 lg:mb-64 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-8 md:px-16 lg:px-48">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-primary">
        Our Services
    </h1>
    
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-16 mt-6 sm:mt-8 md:mt-10">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            observer={true} 
            observeParents={true}
            className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
            breakpoints={{
                // Mobile (default)
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16
                },
                // Tablet Small
                540: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                // Tablet
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                // Desktop
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
        >
            {services.map((service, index) => (
                <SwiperSlide key={service.id}>
                    <div 
                        className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] 
                                 rounded-lg overflow-hidden shadow-lg 
                                 transition-transform duration-300 hover:scale-[1.02]"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                        />
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 rounded-b-lg p-4 sm:p-5 md:p-6"
                            variants={overlayVariants}
                            initial="initial"
                            animate={hoveredIndex === index ? "hover" : "initial"}
                        >
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-white mb-2">
                                {service.name}
                            </h3>
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="relative"
                                        variants={descriptionVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <p className="text-white text-sm sm:text-base 
                                                    text-justify 
                                                    max-h-[100px] sm:max-h-[150px] md:max-h-[200px] 
                                                    overflow-y-auto 
                                                    pr-2
                                                    scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
                                            {service.description}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</div>
    );
};

export default Services;
