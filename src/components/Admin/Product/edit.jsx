import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
import  Swal  from "sweetalert2";
const EditProduct = ({ onClose, onProductUpdated, id }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        category_id: ''
    });

    useEffect(() => {
            getCategories();
            getProducts();
        }, []);
    
        const getCategories = async () => {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('id, name').eq('is_active', true);;
                
                if (error) {
                    Swal.error('Failed to fetch categories');
                    return;
                }
                setCategories(data);
            } catch (error) {
                console.error('Error:', error);
                Swal.error('An error occurred while fetching categories');
            }
        };
        const getProducts = async () => {
                const { data, error } = await supabase
                    .from('product')
                    .select('*')
                    .eq('id', id)
                    .single();
        
                if (error) {
                    Toast.fire({
                        icon: "error",
                        title: error.message,
                    });
                } else {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category_id: data.category_id,
                        image_url: data.image_url,
                    });
                }
            }
            const validateForm = () => {
                let tempErrors = {};
                let isValid = true;
        
                // Name validation
                if (!formData.name.trim()) {
                    tempErrors.name = 'Name is required';
                    isValid = false;
                } else if (formData.name.length < 3) {
                    tempErrors.name = 'Name must be at least 3 characters long';
                    isValid = false;
                }
        
                // Description validation
                if (!formData.description.trim()) {
                    tempErrors.description = 'Description is required';
                    isValid = false;
                }
        
                // Price validation
                if (!formData.price) {
                    tempErrors.price = 'Price is required';
                    isValid = false;
                } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
                    tempErrors.price = 'Price must be a positive number';
                    isValid = false;
                }
        
                // Image validation
                
        
                // Category validation
                if (!formData.category_id) {
                    tempErrors.category_id = 'Please select a category';
                    isValid = false;
                }
        
                setErrors(tempErrors);
                return isValid;
            };
    const handleImageUpload = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = await supabase.storage
                .from('product')
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const handleSaveEdit = async () => {
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                text: 'Mohon periksa kembali form anda',
            });
            return;
        }
    
        setLoading(true);
        try {
            let imageUrl = formData.image_url;
    
            // If there's a new image file selected
            if (formData.image_url instanceof File) {
                // First, get the current product data to get the old image URL
                const { data: currentProduct, error: fetchError } = await supabase
                    .from('product')
                    .select('image_url')
                    .eq('id', id)
                    .single();
    
                if (fetchError) {
                    throw new Error('Error fetching current product data');
                }
    
                // Delete old image if it exists
                if (currentProduct?.image_url) {
                    try {
                        // Extract file path from the full URL
                        const oldFilePath = currentProduct.image_url.split('/').slice(-1)[0];
    
                        console.log("Attempting to delete old file:", oldFilePath);
    
                        const { error: deleteError } = await supabase.storage
                            .from("product")
                            .remove([oldFilePath]);
    
                        if (deleteError) {
                            console.warn("Error deleting old image:", deleteError);
                            // Continue with update even if deletion fails
                        }
                    } catch (storageError) {
                        console.warn("Error in storage deletion:", storageError);
                        // Continue with update even if deletion fails
                    }
                }
    
                // Upload new image
                imageUrl = await handleImageUpload(formData.image_url);
            }
    
            // Update product data
            const { error: updateError } = await supabase
                .from('product')
                .update({
                    name: formData.name,
                    description: formData.description,
                    price: Number(formData.price),
                    category_id: formData.category_id,
                    image_url: imageUrl,
                    updated_at: new Date()
                })
                .eq("id", id);
    
            if (updateError) throw updateError;
    
            Toast.fire({
                icon: "success",
                title: "Product updated successfully"
            });
            onProductUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
            Toast.fire({
                icon: "error",
                title: error.message || "Error updating product"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-1/2">
                <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <textarea
                            id="description"
                            className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                        <input
                            type="number"
                            id="price"
                            className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : ''}`}
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className={`w-full p-2 border rounded-md ${errors.image_url ? 'border-red-500' : ''}`}
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                image_url: e.target.files[0]
                            }));
                            if (errors.image_url) {
                                setErrors(prev => ({
                                    ...prev,
                                    image_url: ''
                                }));
                            }
                        }}
                    />
                    <small>Max file size: 200kb</small>
                    {formData.image_url && !(formData.image_url instanceof File) && (
                        <img 
                            src={formData.image_url} 
                            alt="Current partnership" 
                            className="mt-2 h-20 object-contain"
                        />
                    )}
                    {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                </div>
                <div className="mb-4">
                        <label htmlFor="category_id" className="block text-gray-700 font-bold mb-2">Category:</label>
                        <select
                            id="category_id"
                            className={`w-full p-2 border rounded-md ${errors.category_id ? 'border-red-500' : ''}`}
                            value={formData.category_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveEdit}
                        disabled={loading || formData.name === ""}
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2
                            ${(loading || formData.name === "") ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;