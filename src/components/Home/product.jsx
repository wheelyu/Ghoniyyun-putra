import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseConfig";
import { Fuel } from "lucide-react";
import useCategoryStore from "../../stores/useCategoryStore";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
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
        <div className="bg-white bg-opacity-90 mb-1 pt-20 px-4 md:px-48">
            <h1 className="text-4xl font-bold mb-12 text-primary">
                Our category product
            </h1>
            <div className="bg-white ">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3.5}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 30
                        }
                    }}
                    className="h-[200px] custom-swiper  p-5 "
                >
                    {category.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className="service-card w-full shadow-xl cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-start gap-3 transition-all duration-300 group md:hover:bg-primary">
                                
                                <p className="font-bold text-xl md:group-hover:text-white text-primary">
                                <Fuel className="" />
                                    {category.name}
                                </p>
                                <button 
                                    onClick={() => handleCategoryClick(category.name)}
                                    className=" md:group-hover:text-white text-sm justify-end w-full hover:underline flex text-primary"
                                >
                                    See More
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-end">
                    <a href='/product' className="border-primary hover:bg-primary hover:text-white border text-primary py-2 px-4 rounded mt-8 transition-all duration-300">
                        See More Product
                    </a>
                </div>
            </div>
            
            
            
        </div>
    );
};

export default OurProduct;