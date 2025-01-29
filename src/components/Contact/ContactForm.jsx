import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; 
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faComment, faPaperPlane, faPhone, faNewspaper, faCity } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../services/supabaseConfig';
import { use } from 'react';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        email: '',
        company: '',
        number: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        topic: '',
        name: '',
        email: '',
        company: '',
        number: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics();
    }, []);
    const getTopics = async () => {
        try {
            const { data, error } = await supabase.from('topic').select('*').eq('is_active', true);
            if (error) {
                console.error("Error fetching topics:", error.message);
            } else {
                setTopics(data);
            }
        } catch (error) {
            console.error("Error fetching topics:", error.message);
    }
    };
    const validateForm = () => {
        let tempErrors = { topic: '', name: '', email: '',company: '', number: '', message: '' };
        let formIsValid = true;
        // Topic validation
        if (!formData.topic) {
            tempErrors.topic = "Please select a topic";
            formIsValid = false;
        }
        // Name validation
        if (formData.name.trim().length < 3) {
            tempErrors.name = "Name must be at least 3 characters long";
            formIsValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
            formIsValid = false;
        }

        // Company validation
        if (formData.company.trim().length < 3) {
            tempErrors.company = "Company name must be at least 3 characters long";
            formIsValid = false;
        }

        // Phone number validation (11-13 digits)
        const numberRegex = /^\d{11,13}$/;
        if (!numberRegex.test(formData.number)) {
            tempErrors.number = "Phone number must be between 11-13 digits";
            formIsValid = false;
        }

        // Message validation
        if (formData.message.trim().length < 10) {
            tempErrors.message = "Message must be at least 10 characters long";
            formIsValid = false;
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman
    
        // Validasi Form
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all required fields.',
                confirmButtonColor: '#FF0000'
            });
            return;
        }
    
        console.log("Form Data:", formData);
    
        // Simpan data ke Supabase
        try {
            setIsLoading(true);
            const { data, error } = await supabase.from('client').insert([formData]);
    
            if (error) {
                console.error("Supabase Error:", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to save data to the database. Please try again later.',
                    confirmButtonColor: '#FF0000'
                });
                return;
            }
    
            console.log("Data Saved to Supabase:", data);
    
            // Kirim email menggunakan EmailJS
            emailjs
                .send(
                    import.meta.env.VITE_SERVICE_KEY,
                    import.meta.env.VITE_TEMPLATE_KEY,
                    formData,
                    import.meta.env.VITE_PUBLIC_KEY
                )
                .then(
                    (result) => {
                        console.log("Email Sent Successfully:", result);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Your message has been sent successfully!',
                            confirmButtonColor: '#166534'
                        });
    
                        // Reset form setelah sukses
                        setFormData({
                            topic: '',
                            name: '',
                            email: '',
                            company: '',
                            number: '',
                            message: ''
                        });
                        setIsLoading(false);
                    },
                    (error) => {
                        console.error("EmailJS Error:", error.text);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error sending your message. Please try again later.',
                            confirmButtonColor: '#FF0000'
                        });
                        setIsLoading(false);
                    }
                );
        } catch (error) {
            console.error("Unexpected Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
                confirmButtonColor: '#FF0000'
            });
            setIsLoading(false);
        }
    };
    

    return (
        <div className="w-full lg:w-4/5 xl:w-1/2 mx-auto px-4 py-8">
        <div className="container mx-auto bg-white rounded-xl overflow-hidden">
            {/* Contact Information Section */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-primary p-4 sm:p-6 md:p-8 flex flex-col h-fit z-10"
            >
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 italic">Get in Touch</h2>
                <p className="mb-6 text-gray-400 pl-0 sm:pl-5 md:pl-10 text-sm sm:text-base">
                    Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
                </p>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 sm:p-8 md:p-12 w-full justify-start items-start shadow-lg relative z-40 rounded-xl bg-white"
                >
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-primary'>Fill in Form</h1>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            {/* Topic Select */}
                            <div className="relative">
                                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-700">
                                    Topic
                                </label>
                                <div className="relative">
                                    <select
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-gray-400
                                            ${errors.topic ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                    >
                                        <option value="" disabled>Pilih Topic</option>
                                        {topics.map((topic, index) => (
                                            <option key={index} value={topic.name}>{topic.name}</option>
                                        ))}
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    <FontAwesomeIcon 
                                        icon={faNewspaper} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                </div>
                                {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                            </div>

                            {/* Name Input */}
                            <div className="relative">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-black 
                                            ${errors.name ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                        placeholder="Masukkan nama lengkap Anda"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faUser} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-black 
                                            ${errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                        placeholder="example@email.com"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faEnvelope} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Company Input */}
                            <div className="relative">
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                                    Company
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-black 
                                            ${errors.company ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                        placeholder="Masukkan nama perusahaan Anda"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faCity} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                </div>
                                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                            </div>

                            {/* Phone Number Input */}
                            <div className="relative">
                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-700">
                                    Number
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-black 
                                            ${errors.number ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                        placeholder="+6281234567890"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faPhone} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                </div>
                                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-black 
                                            ${errors.message ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                        placeholder="Your Message"
                                    ></textarea>
                                    <FontAwesomeIcon 
                                        icon={faComment} 
                                        className="absolute left-3 top-3 text-gray-400" 
                                    />
                                </div>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="w-full flex justify-end mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 sm:py-3 px-6 sm:px-10 rounded-md hover:opacity-90 transition-all relative"
                        >
                            {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin h-5 w-5 mr-2">
                                <div className="h-full w-full rounded-full border-2 border-white border-t-transparent" />
                                </div>
                                Loading...
                            </div>
                            ) : (
                            <>
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                Send Message
                            </>
                            )}
                        </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    </div>
    );
};

export default ContactForm;