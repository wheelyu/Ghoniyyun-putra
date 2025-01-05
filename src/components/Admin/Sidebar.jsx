import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../../stores/authStore';
import { logoutAlert, Toast } from "../alert/toast";
import { 
    Home, 
    Power,
    Users,
    BoxIcon,
    ListCheckIcon,
    ChevronLeft, 
    ChevronRight,
    Settings
} from 'lucide-react';
import { Link } from "react-router-dom";
const Sidebar = ({ active }) => {
    const navLink = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <Home />,
        },
        {
            path: "/admin/product",
            name: "Product",
            icon: <BoxIcon />,
        },
        {
            path: "/admin/category",
            name: "Category",
            icon: <ListCheckIcon />,
        },
        {
            path: "/admin/client",
            name: "Client",
            icon: <Users />,
        },
    ]
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { clearToken } = useAuthStore();
    const handleLogout = () => {
        const logoutAction = () => {
                // Clear the authentication token
                clearToken();
    
                // Redirect to login page
                navigate('/');
                
                // Show success message
                Toast.fire({
                    icon: "success",
                    title: "Logout success.",
                });
                // Close dropdown
                };
            
                // Show logout confirmation alert
                logoutAlert(logoutAction);
        };
    return (
        <div className="flex">
            <div className={`
                ${isSidebarOpen ? 'w-64' : 'w-20'} 
                bg-primary text-white 
                transition-all duration-300 
                flex flex-col relative
            `}>
                {/* Toggle Sidebar Button */}
                <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-4 right-4 z-10 bg-primary p-1 rounded-full"
                >
                {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>

                {/* Logo */}
                <div className=" flex p-5 h-20  border-b border-white">
                    
                <h2 className={`
                    ${isSidebarOpen ? 'flex gap-2' : 'hidden'} 
                    text-xl font-bold
                `}>
                    <Settings className="w-8 h-8" />
                    Admin Panel
                </h2>
                </div>

                {/* Menu Items */}
                <nav className="mt-8 ml-3 mr-3 flex-1 ">
                {navLink.map((item, index) => (
                    <Link
                    key={index}
                    to={item.path}
                    className={`
                        flex items-center text-sm py-2 px-4 font-medium text-gray-100 rounded-md mt-2
                        hover:bg-secondary cursor-pointer
                        ${active === item.name ? 'bg-secondary' : ''}
                    `}
                    >
                    {item.icon}
                    <span className={`
                        ${isSidebarOpen ? 'ml-3 block' : 'hidden'}
                        text-sm
                    `}>
                        {item.name}
                    </span>
                    </Link>
                    
                ))}
                </nav>

                {/* Footer */}
                <div className="flex-1 " />
                    <button onClick={handleLogout}>
                        <div className="px-4 py-3 ml-3 mr-3 hover:bg-secondary cursor-pointer flex items-center">
                            <Power className="w-5 h-5" />
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