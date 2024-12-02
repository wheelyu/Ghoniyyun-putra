import React from "react";

const Hero = () => {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Darkness Overlay */}
            <div className="absolute inset-0 overflow-hidden ">
                <img 
                    src="bg.webp" 
                    alt="Background" 
                    className="w-full h-full  object-cover object-right absolute brightness-50 contrast-75 " 
                />
                {/* Tambahan overlay gelap */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            {/* Navbar */}
            <Navbar active="Home"/>
            {/* Content */}
            <AnimatePresence>
                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 120 
                }}
                className="relative z-10 text-center px-4 py-10 bg-white border-b-[10px] border-red-400 rounded-xl shadow-lg overflow-hidden"
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
                    Welcome to
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
                    PT. GHONIYYUN PUTRA
                    </motion.span>
                </motion.h1>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Hero