import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Product() {
    return (
        <div className="">
            <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Darkness Overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src="bg.webp" 
                    alt="Background" 
                    className="w-full h-full   object-cover object-bottom absolute brightness-50 contrast-75 " 
                />
                {/* Tambahan overlay gelap */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            {/* Navbar */}
            <Navbar active="About"/>
            
        </div>

        <Footer />
        </div>
    );
}
