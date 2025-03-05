import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseConfig";
import { Fuel } from "lucide-react";
import useCategoryStore from "../../stores/useCategoryStore";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import Bg from '../../assets/bg_our_product.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OurProduct = () => {
    const [category, setCategory] = useState([]);
    const setSelectedCategory = useCategoryStore(state => state.setSelectedCategory);
    const navigate = useNavigate();
    const [topic, setTopic] = useState([]);
    const fetchCategory = async () => {
        try {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .eq("is_active", true)
            
            const { data: topicData, error: topicError } = await supabase
                .from("topic")
                .select("*")
                .eq("is_active", true)

            if (error) {
                throw error;
            }
    
            setCategory(data);
            setTopic(topicData);
        } catch (error) {
            alert(error.message);
        }
    };
    
    useEffect(() => {
        fetchCategory();
    }, []);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        navigate('/product');
    };

    return (
        <div 
            className="bg-cover bg-bottom bg-no-repeat bg-black bg-opacity-20 mb-1 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-48  h-[600px]"
            style={{
                backgroundImage: `url(${Bg})`,
                backgroundBlendMode: 'overlay'
            }}
        >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 w-fit text-white">
                Our category product
                <div className="w-full bg-white h-2 my-5 shadow-xl">
                    
                </div>
            </h1>
            <div className="bg-transparent bg-opacity-80">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // Mobile (320px and up)
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16
                        },
                        // Small tablets (480px and up)
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 20
                        },
                        // Tablets (640px and up)
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 24
                        },
                        // Small laptops (768px and up)
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 28
                        },
                        // Laptops/Desktops (1024px and up)
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        // Large screens (1280px and up)
                        1280: {
                            slidesPerView: 3.5,
                            spaceBetween: 30
                        }
                    }}
                    className="h-[180px] sm:h-[200px] custom-swiper p-3 sm:p-4 md:p-5"
                >
                    {category.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className="service-card w-full  hover:shadow-xl 
                                          cursor-pointer snap-start shrink-0 
                                          py-4 sm:py-6 md:py-8 px-4 sm:px-5 md:px-6 
                                          bg-white flex flex-col items-start rounded-xl
                                          gap-2 sm:gap-3 
                                          transition-all duration-300 
                                          group hover:bg-primary">
                                <div className="flex items-center gap-2">
                                    <Fuel className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white" />
                                    <p className="font-bold text-sm sm:text-base text-primary group-hover:text-white">
                                        {category.name}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleCategoryClick(category.name)}
                                    className="group-hover:text-white text-sm sm:text-base 
                                             justify-end w-full hover:underline 
                                             flex text-primary transition-colors duration-300"
                                >
                                    See More
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                    <div className="w-full bg-white h-2 my-5 shadow-xl">
                    
                    </div>
                <div className="flex justify-end mt-4 sm:mt-6 md:mt-8 px-2">
                    <a href='/product' 
                       className="border-primary bg-primary hover:text-primary hover:bg-white
                                border text-white 
                                py-4 px-8 rounded 
                                text-sm sm:text-base
                                transition-all duration-300">
                        See More Product
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OurProduct;