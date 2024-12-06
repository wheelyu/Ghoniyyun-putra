import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (validateForm()) {
            if (email === "admin@example.com" && password === "admin2") {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You have successfully logged in.",
                    confirmButtonText: "OK",
                }).then(() => {
                    localStorage.setItem("token", "true");
                    navigate("/admin/dashboard");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    return (
        <div className="h-screen p-40">
            <div className="mx-auto w-[1000px] bg-white h-[500px] rounded-xl p-2 flex flex-row shadow-xl">
                <div className="w-1/2 bg-primary h-full rounded-xl">
                </div>
                <div className="w-1/2 bg-white h-full rounded-xl p-4 flex flex-col">
                    <div className="h-1/2">
                        <h1 className="text-4xl font-bold mx-auto text-center items-center">Login</h1>
                    </div>
                    <div className="h-1/2">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                <div className="flex items-center border-b border-gray-300">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 ml-2" />
                                    <input 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        type="email" 
                                        className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none 
                                            ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="Enter your email" 
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs italic">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                                <div className="flex items-center border-b border-gray-300">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-500 ml-2" />
                                    <input 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        type="password" 
                                        className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none 
                                            ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder="Enter your password" 
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs italic">{errors.password}</p>
                                )}
                            </div>
                            <button 
                                onClick={handleSubmit} 
                                className="bg-primary text-white rounded-lg p-2 w-full"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;