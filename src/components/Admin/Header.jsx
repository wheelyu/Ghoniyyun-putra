import React from "react";
import { 
    Bell, 
    Search, 
    Menu 
    } from 'lucide-react';
const Header = () => {
    return (
        <header className="bg-white shadow-md h-20 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <Menu className="text-gray-600 cursor-pointer" />
                <div className="relative">
                <input 
                    type="text" 
                    placeholder="Cari..." 
                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-3 text-gray-400" />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                <Bell className="text-gray-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    3
                </span>
                </div>

                <div className="flex items-center space-x-2">
                <img 
                    
                    alt="Profil Admin" 
                    className="rounded-full w-10 h-10"
                />
                <div>
                    <p className="text-sm font-semibold">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                </div>
                </div>
            </div>
        </header>
    );
};

export default Header;