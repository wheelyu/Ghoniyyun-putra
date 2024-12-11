import React from "react";
import Navbar from "../Navbar";
import { motion, AnimatePresence } from 'framer-motion';
const Hero = () => {
    return (
        <div className="relative h-[350px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Darkness Overlay */}
            <div className="absolute inset-0 overflow-hidden ">
                <img 
                    src="bg.webp" 
                    alt="Background" 
                    className="w-full h-full  object-cover object-right absolute brightness-50 contrast-75 " 
                />
                {/* Tambahan overlay gelap */}
                <div className="absolute inset-0 bg-primary opacity-50"></div>
            </div>
            {/* Navbar */}
            <Navbar active="Home"/>
            {/* Content */}
            <AnimatePresence>
                <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 120 
                }}
                className="relative  text-center px-4 py-10 bg-white border-t-[10px] border-primary rounded-xl shadow-lg overflow-hidden w-full top-20 "
                >
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                    delay: 0.3, 
                    duration: 0.8, 
                    type: "spring" 
                    }}
                    className="text-black font-bold text-2xl md:text-7xl w-full md:w-3/4 mx-auto leading-tight relative"
                >
                    <motion.span
                    initial={{ backgroundSize: '0% 200%' }}
                    animate={{ backgroundSize: '100% 100%' }}
                    transition={{ 
                        delay: 0.6, 
                        duration: 1, 
                        ease: "easeInOut" 
                    }}
                    style={{
                        backgroundImage: 'linear-gradient(to right, transparent 0%, #f87171 0%)',
                        backgroundPosition: '100% 0',
                        backgroundRepeat: 'no-repeat',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                    >
                    Your Trusted Partner 
                    </motion.span>
                    <br/>
                    <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        delay: 0.9, 
                        duration: 0.7, 
                        type: "spring" 
                    }}
                    className="inline-block"
                    >
                    in Fuel Retail
                    </motion.span>
                </motion.h1>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Hero