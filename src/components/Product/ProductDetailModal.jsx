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
                className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    className="bg-white w-[40%] p-4 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="flex justify-between">
                    <motion.h1 className="text-xl font-bold text-gray-800    "
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}>{product.name}</motion.h1>
                        <button onClick={closeModal}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex items-center mb-4  gap-4">
                    <div className="w-1/2">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-auto h-auto mb-4"
                        />
                    </div>
                    <div className="w-1/2">
                    <motion.h3 
                        className="text-xl font-bold text-gray-800 flex "
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                       
                        <h1 className={`font-bold text-green-600`}>
                            Available
                        </h1>
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
                        className="text-gray-600 mb-4 h-fit text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {product.description}
                    </motion.p>
                    </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductDetailModal;