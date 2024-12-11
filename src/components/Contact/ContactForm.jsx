import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; 
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faComment, faPaperPlane, faPhone, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const ContactForm = ({ ref }) => {
    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        email: '',
        number: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        topic: '',
        name: '',
        email: '',
        number: '',
        message: ''
    });

    const validateForm = () => {
        let tempErrors = { topic: '', name: '', email: '', number: '', message: '' };
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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            emailjs.send(
                import.meta.env.VITE_SERVICE_EY,
                import.meta.env.VITE_TEMPLATE_KEY,
                formData,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your message has been sent successfully!',
                    confirmButtonColor: '#166534'
                })
                setFormData({
                    topic: '',
                    name: '',
                    email: '',
                    number: '',
                    message: ''
                });
            }, (error) => {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error sending your message. Please try again later.',
                    confirmButtonColor: '#FF0000'
                })
            });
        }
    };

    return (
        <div className="h-fit  w-1/2 mx-auto flex justify-center" ref={ref}>
            <div className="container mx-auto  gap-8 bg-white  rounded-xl overflow-hidden">
                {/* Left Side - Contact Information */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-primary to-red-500 text-white p-8 flex flex-col h-fit z-10 "
                >
                    <h2 className="text-7xl font-bold mb-4 italic ">Get in Touch</h2>
                    <p className="mb-6 text-gray-200 pl-10">
                        Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
                    </p>
                    <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-12 w-full  justify-start items-start shadow-lg relative  z-40 rounded-xl bg-white"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h1 className='text-4xl font-bold mb-4 text-primary'>Fill in Form</h1>
                        <div className="relative mr-10">
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
                                        ${errors.topic ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                    
                                >
                                    <option value="" disabled>Pilih Topic</option>
                                    <option value="teknologi">Teknologi</option>
                                    <option value="olahraga">Olahraga</option>
                                    <option value="kesehatan">Kesehatan</option>
                                    <option value="pendidikan">Pendidikan</option>
                                    <option value="hiburan">Lainnya</option>
                                </select>
                                <FontAwesomeIcon 
                                    icon={faNewspaper} 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                />
                            </div>
                            {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                        </div>
                        {/* Name Input */}
                        <div className="relative mr-10">
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
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none 
                                        ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
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
                        <div className="relative mr-10">
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
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none 
                                        ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                    placeholder="example@email.com"
                                    
                                />
                                <FontAwesomeIcon 
                                    icon={faEnvelope} 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Number Input */}
                        <div className="relative mr-10">
                            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-700">
                                Number
                            </label>
                            <div className="relative">
                                <input
                                    type="number"  // Changed to text to allow custom validation
                                    id="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none 
                                        ${errors.number ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                    placeholder="+6281234567890"
                                    
                                />
                                <FontAwesomeIcon 
                                    icon={faPhone} 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                />
                            </div>
                            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                        </div>

                        {/* Message Input */}
                        <div className="relative mr-10">
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
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none 
                                        ${errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                                    placeholder="Your Message"
                                    
                                ></textarea>
                                <FontAwesomeIcon 
                                    icon={faComment} 
                                    className="absolute left-3 top-3 text-gray-400" 
                                />
                            </div>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <div className='w-full'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-md hover:opacity-90 transition-all float-right mr-10 px-10"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                Send Message
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
                </motion.div>

                {/* Right Side - Contact Form */}
                
            </div>
        </div>
    );
};

export default ContactForm;