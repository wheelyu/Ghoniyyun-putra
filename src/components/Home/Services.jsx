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
        <div className="bg-white bg-opacity-90 mb-56 pt-20 px-4 md:px-48">
            <h1 className="text-4xl font-bold mb-12 text-primary">Our Services</h1>
            <div className="w-full px-4 md:px-8 lg:px-16 mt-10">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={true}
                    observer={true} 
                    observeParents={true} 
                    className="w-full h-[600px]"
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={service.id}>
                            <div 
                                className="relative h-[600px] rounded-lg overflow-hidden"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img
                                    src={service.image_url}
                                    alt={service.name}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                />
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 rounded-b-lg"
                                    variants={overlayVariants}
                                    initial="initial"
                                    animate={hoveredIndex === index ? "hover" : "initial"}
                                >
                                    <h3 className="text-white text-xl font-semibold text-center">
                                        {service.name}
                                    </h3>
                                    <AnimatePresence>
                                        {hoveredIndex === index && (
                                            <motion.p
                                                className="text-white text-sm mt-2 text-justify max-h-[200px] overflow-y-auto"
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
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Services;
