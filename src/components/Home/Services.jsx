import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Services = () => {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const getServices = async () => {
        try {
            const { data, error } = await supabase
                .from('service')
                .select(`
                    id, name, description, is_active,
                    service_image (image_url)
                `)
                .eq('is_active', true);
            if (error) {
                throw error;
            }

            const formattedData = data.map(service => ({
                ...service,
                images: service.service_image ? service.service_image.map(img => img.image_url) : []
            }));

            setServices(formattedData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    const serviceLength = services.length/2;
    return (
        <div className="bg-white bg-opacity-90  sm:pt-16  px-4 sm:px-8 md:px-16 lg:px-48">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-primary">
                Our Services
            </h1>
            
            {/* Tabs Navigation */}
            <div className={`grid grid-cols-2 md:grid-cols-${serviceLength} gap-3 mb-8 justify-center`}>
                {services.map((service, index) => (
                    <button
                        key={service.id}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            activeTab === index
                                ? "bg-primary text-white shadow-lg"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        {service.name}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                <div className="max-w-3xl mx-auto">
                    {services[activeTab] && (
                        <div className="animate-fade-in text-center">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">
                                {services[activeTab].name}
                            </h2>
                            
                            {/* Swiper Component */}
                            {services[activeTab].images.length > 0 && (
                            <div>
                            <div className="mb-8 hidden md:flex">
                                <Swiper
                                modules={[Pagination, Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={services[activeTab].images.length === 1 ? 1 : 
                                                services[activeTab].images.length === 2 ? 2 : 3}
                                pagination={{ clickable: true }}
                                navigation
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                className="w-full"
                                >
                                {services[activeTab].images.map((image, index) => (
                                    <SwiperSlide key={index} className="flex justify-center">
                                    <img 
                                        src={image}
                                        alt={`Service Image ${index + 1}`}
                                        className={`h-[400px] object-cover rounded-lg shadow-md ${
                                        services[activeTab].images.length === 1 ? 'w-full' : 
                                        services[activeTab].images.length === 2 ? 'w-full' : 'w-full'
                                        }`}
                                    />
                                    </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>
                            <div className="mb-8  md:hidden">
                                <Swiper
                                modules={[Pagination, Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                navigation
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                className="w-full"
                                >
                                {services[activeTab].images.map((image, index) => (
                                    <SwiperSlide key={index} className="flex justify-center">
                                    <img 
                                        src={image}
                                        alt={`Service Image ${index + 1}`}
                                        className={`h-[400px] object-cover rounded-lg shadow-md ${
                                        services[activeTab].images.length === 1 ? 'w-full' : 
                                        services[activeTab].images.length === 2 ? 'w-full' : 'w-full'
                                        }`}
                                    />
                                    </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>
                            </div>
                            )}
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {services[activeTab].description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;