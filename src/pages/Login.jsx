import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseConfig";
import useAuthStore from "../stores/authStore"; // Import auth store
import { Toast } from "../components/alert/toast";
import Bg from "../assets/bg.jpeg";
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
        <div className="h-screen bg-primary flex flex-row "
        >
            <div className=" w-[700px] bg-white  h-screen  rounded-xl p-2 flex flex-row shadow-2xl">
                
                <div className="w-full bg-transparent h-full rounded-xl p-20 flex flex-col">
                    <div className="">
                        <h1 className="text-4xl font-bold mx-auto text-center items-center mb-20">Welcome Back</h1>
                    </div>
                    <div className="">
                        <form>
                            <div className="">
                                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                <div className="flex items-center ">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className={`bg-gray-100 w-full text-gray-900  rounded-md p-2 mb-4  transition ease-in-out duration-150 ${errors.email ? "border-red-500 border-2" : ""}`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs italic">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Password:</label>
                                <div className="flex items-center ">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs italic">{errors.password}</p>
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-primary text-white rounded-lg p-2 px-5 float-right"
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
