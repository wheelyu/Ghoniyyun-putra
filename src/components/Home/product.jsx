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
import Pertamina1 from "../../assets/Lowongan-Pertamina.webp"
import Pertamina2 from "../../assets/promo-pertamina.webp"
import Pertamina3 from "../../assets/pertamina1.webp"
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
    const images = [
        Pertamina1,
        Pertamina2,
        Pertamina3,
        Pertamina1,
        Pertamina2,
    ];
    return (
        <div className="bg-white bg-opacity-90 mb-56 pt-20 px-4 md:px-48">
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
                                    className="md:text-white md:hover:text-white text-sm justify-end w-full hover:underline flex text-primary"
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
            <h1 className="text-4xl font-bold mb-12 text-primary">Our Services</h1>
            <div className="flex flex-col md:flex-row gap-10 justify-center  items-center">
            {topic.slice(0, 3).map((topic, index) => (
            <div key={index} className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
                <div className="w-24 h-24 bg-primary rounded-full absolute -right-5 -top-7">
                    <p className="absolute bottom-6 left-7 text-white text-2xl">{index + 1}</p>
                </div>
                <div className="fill-violet-500 w-12">
                    
                </div>
                <div className="h-16">
                <h1 className="font-bold text-xl">{topic.name}</h1>
                </div>
                
            </div>
            ))}
            </div>
            <div className="md:text-6xl text-3xl font-bold mt-20 text-primary text-center">
                Documentations
            </div>
            <div className="w-full px-4 md:px-8 lg:px-16 mt-10">
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
        </div>
    );
};

export default OurProduct;