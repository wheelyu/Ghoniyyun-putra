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
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

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

    const slideVariants = {
        inactive: {
            marginTop: 150,
            height: 300,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        active: {
            marginTop: 0,
            height: 600,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    const overlayVariants = {
        initial: {
            backgroundColor: "rgba(220, 38, 38, 0.2)",
            padding: "1rem"
        },
        hover: {
            backgroundColor: "rgba(220, 38, 38, 0.9)",
            padding: "1.5rem",
            transition: { duration: 0.2 },
            cursor: "pointer"
        }
    };

    const descriptionVariants = {
        initial: { 
            opacity: 0, 
            y: 10,
            height: 0 
        },
        animate: { 
            opacity: 1, 
            y: 0,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0,
            y: 10,
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="bg-white bg-opacity-90 mb-56 pt-20 px-4 md:px-48">
            <h1 className="text-4xl font-bold mb-12 text-primary">Our Services</h1>
            <div className="w-full px-4 md:px-8 lg:px-16 mt-10">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                        setIsHovered(false);
                    }}
                    className="w-full h-[600px]"
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={service.id}>
                            <motion.div 
                                className="relative h-full"
                                variants={slideVariants}
                                initial="inactive"
                                animate={index === activeIndex ? "active" : "inactive"}
                                onMouseEnter={() => index === activeIndex && setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <img
                                    src={service.image_url}
                                    alt={service.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 rounded-b-lg"
                                    variants={overlayVariants}
                                    initial="initial"
                                    animate={index === activeIndex && isHovered ? "hover" : "initial"}
                                >
                                    <h3 className="text-white text-xl font-semibold text-center">
                                        {service.name}
                                    </h3>
                                    <AnimatePresence>
                                        {index === activeIndex && isHovered && (
                                            <motion.p
                                                className="text-white text-sm mt-2 text-justify overflow-hidden"
                                                variants={descriptionVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                {service.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Services;