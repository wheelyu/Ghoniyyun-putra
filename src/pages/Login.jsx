import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseConfig";
import useAuthStore from "../stores/authStore"; // Import auth store
import { Toast } from "../components/alert/toast";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    Toast.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: error.message,
                        confirmButtonColor: "#FF0000",
                    });
                    console.error("Authentication Error:", error.message);
                } else {
                    Toast.fire({
                        icon: "success",
                        title: "Login Successful",
                        text: "login success!",
                        confirmButtonColor: "#166534",
                    });

                    // Simpan auth-token ke global state
                    setToken(data.session?.access_token);

                    // Redirect ke halaman dashboard
                    navigate("/dashboard/admin");
                }
            } catch (err) {
                console.error("Unexpected Error:", err);
                Toast.fire({
                    icon: "error",
                    title: "Error",
                    text: "An unexpected error occurred. Please try again later.",
                    confirmButtonColor: "#FF0000",
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Login Form Container */}
                <div className="p-8 sm:p-12">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <motion.h1 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3"
                        >
                            Welcome Back
                        </motion.h1>
                        <p className="text-gray-500">Please sign in to your account</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                </div>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 transition-all
                                        ${errors.email 
                                            ? 'border-red-500 focus:ring-red-200' 
                                            : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 transition-all
                                        ${errors.password 
                                            ? 'border-red-500 focus:ring-red-200' 
                                            : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            className="w-full py-3 bg-gradient-to-r from-primary to-pink-500 text-white rounded-lg 
                                    font-semibold shadow-lg hover:shadow-xl transition-all duration-200
                                    focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            Sign In
                        </motion.button>

                        {/* Sign Up Link */}
                        <Link to="/">
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mt-4 text-sm text-gray-600 hover:underline"
                            >
                                Back to Home
                            </motion.p>
                        </Link>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
