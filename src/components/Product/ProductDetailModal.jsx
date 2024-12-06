import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPostsbyId } from "../../services/api";

const ProductDetailModal = ({ id, closeModal }) => {
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getPostsbyId(id);
                setProduct(response.data);
                setCategoryName(response.data.category.name);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

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
                className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    className="bg-white w-[90%] p-4 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.h3 
                        className="text-xl font-bold text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {product.name}
                    </motion.h3>
                    
                    <motion.small
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {categoryName}
                    </motion.small> 
                    
                    <br/>
                    <motion.small
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Description:
                    </motion.small>
                    
                    <motion.p 
                        className="text-gray-600 mb-4 h-16 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {product.description}
                    </motion.p>
                    
                    <motion.div 
                        className="flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h1>Stock: {product.stock}</h1>
                        <h1 className={`font-bold ${product.is_active ? "text-green-600" : "text-red-600"}`}>
                            {product.is_active ? "Tersedia" : "Tidak Tersedia"}
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductDetailModal;