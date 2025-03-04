import React from "react";
import Navbar from "../Navbar";
import Bg from '../../assets/bg.jpeg'
const Hero = () => {
    return (
        <div className="relative h-[100px] md:h-[200px] flex items-center justify-center overflow-hidden">
    {/* Background Image with Darkness Overlay */}
    <div className="absolute inset-0 overflow-hidden">
        <img 
            src={Bg} 
            alt="Background" 
            className="w-full h-full object-cover object-center md:object-right absolute brightness-50 contrast-75" 
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-primary opacity-50"></div>
    </div>
    
    {/* Navbar */}
    <Navbar active="Home"/>
    
    {/* Content */}
    
                
                
    </div>
    );
}

export default Hero