import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../services/supabaseConfig";
import { X } from "lucide-react";
const ProductDetailModal = ({ id, closeModal }) => {
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from("product")
                .select(`
                    *,
                    category:category_id (
                        id,
                        name
                    )
                `)
                .eq("id", id)
                .single();

            if (error) {
                throw error;
            }

            setProduct(data);
            setCategoryName(data.category?.name || "Uncategorized");
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const modalVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 50
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <AnimatePresence>
    <motion.div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 p-4"
        onClick={closeModal}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <motion.div
            className="bg-white w-full md:w-[80%] lg:w-[60%] p-4 rounded-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="flex justify-between items-center mb-4">
                <motion.h1 
                    className="text-lg md:text-xl font-bold text-gray-800 truncate"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {product.name}
                </motion.h1>
                <button 
                    onClick={closeModal}
                    className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-3">
                    <motion.h3 
                        className="text-lg md:text-xl font-bold text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="font-bold text-green-600">
                            Available
                        </h1>
                    </motion.h3>
                    
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <small className="block text-sm md:text-base">
                            {categoryName}
                        </small>
                        
                        <small className="block font-medium text-sm md:text-base">
                            Description:
                        </small>
                        
                        <motion.p 
                            className="text-gray-600 text-sm md:text-base"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {product.description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </motion.div>
</AnimatePresence>
    );
};

export default ProductDetailModal;