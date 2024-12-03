import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faComment, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="h-[900px] bg-gray-100 flex  justify-center py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Left Side - Contact Information */}
            <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-red-400 to-red-500 text-white p-8 flex flex-col "
            >
            <h2 className="text-7xl font-bold mb-4 italic p-10">Reach Us</h2>
            <p className="mb-6 text-gray-200 pl-10">
                Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4 pl-10">
                <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                <span>+1 (123) 456-7890</span>
                </div>
            </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8"
            >
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className='text-4xl font-bold mb-4 text-red-400'>Fill in Form</h1>
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
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    />
                    <FontAwesomeIcon 
                    icon={faUser} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                </div>
                </div>

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
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@email.com"
                    required
                    />
                    <FontAwesomeIcon 
                    icon={faEnvelope} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                </div>
                </div>

                <div className="relative mr-10">
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
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+6281234567890"
                    required
                    />
                    <FontAwesomeIcon 
                    icon={faPhone} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                </div>
                </div>

                <div className="relative mr-10">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    Message
                </label>
                <div className="relative ">
                    <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Message"
                    required
                    ></textarea>
                    <FontAwesomeIcon 
                    icon={faComment} 
                    className="absolute left-3 top-3 text-gray-400" 
                    />
                </div>
                </div>
                <div className='w-full'>
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className=" bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-md hover:opacity-90 transition-all float-right mr-10 px-10"
                >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Send Message
                </motion.button>
                </div>
            </form>
            </motion.div>
        </div>
        </div>
    );
};

export default ContactForm;