import React, { useState } from "react";
import { 
    Home, 
    Users,
    BoxIcon,
    ListCheckIcon,
    ChevronLeft, 
    ChevronRight, 
  } from 'lucide-react';
import { Link } from "react-router-dom";
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    return (
        <div className="flex">
            <div className={`
                ${isSidebarOpen ? 'w-64' : 'w-20'} 
                bg-gray-800 text-white 
                transition-all duration-300 
                flex flex-col relative
            `}>
                {/* Toggle Sidebar Button */}
                <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-4 right-4 z-10 bg-gray-700 p-1 rounded-full"
                >
                {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>

                {/* Logo */}
                <div className=" flex p-5 h-20  border-b border-gray-700">
                <h2 className={`
                    ${isSidebarOpen ? 'block' : 'hidden'} 
                    text-xl font-bold
                `}>
                    Admin Panel
                </h2>
                </div>

                {/* Menu Items */}
                <nav className="mt-8 flex-1">
                    <Link to="/admin/dashboard">
                        <div 
                        className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        >
                        
                        <Home className="w-5 h-5" />
                        
                        <span className={`
                            ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                            text-sm
                        `}>
                            Dashboard
                        </span>
                        </div>
                    </Link>

                    <Link to="/admin/kategori">
                        <div 
                        className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        >
                        <ListCheckIcon className="w-5 h-5" />
                        <span className={`
                            ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                            text-sm
                        `}>
                            Category
                        </span>
                        </div>
                    </Link>

                    <Link to="/admin/produk">
                        <div
                        className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        >
                        <BoxIcon className="w-5 h-5" />
                        <span className={`
                            ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                            text-sm
                        `}>
                            Products
                        </span>
                        </div>
                    </Link>
                </nav>

                {/* Footer */}
                <div className="flex-1" />
                    <button onClick={handleLogout}>
                        <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
                            <span className={`
                                ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                                text-sm
                            `}>
                                Keluar
                            </span>
                        </div>
                    </button>
            </div>

        </div>
    );
};

export default Sidebar;