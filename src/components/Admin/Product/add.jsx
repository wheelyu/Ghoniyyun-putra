import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../services/supabaseConfig";
import { Toast } from "../../alert/toast";
const AddProductModal = ({ onClose, onProductAdded }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        category_id: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories();
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
        if (!formData.image) {
            tempErrors.image = 'Image is required';
            isValid = false;
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const maxSize = 200 * 1024; // 200 KB in bytes
        
            if (!allowedTypes.includes(formData.image.type)) {
                tempErrors.image = 'Please select a valid image file (JPG, PNG, or WEBP)';
                isValid = false;
            } else if (formData.image.size > maxSize) {
                tempErrors.image = 'Image size must not exceed 200KB';
                isValid = false;
            }
        }
        

        // Category validation
        if (!formData.category_id) {
            tempErrors.category_id = 'Please select a category';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const handleImageUpload = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            console.log('add product image path: ' + filePath);
            const { data, error } = await supabase.storage
                .from('product')
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            // Handle image upload first
            let imageUrl = null;
            if (formData.image) {
                imageUrl = await handleImageUpload(formData.image);
            }

            // Insert product data
            const { error: insertError } = await supabase
                .from('product')
                .insert([
                    {
                        name: formData.name,
                        description: formData.description,
                        price: Number(formData.price),
                        image_url: imageUrl,
                        category_id: formData.category_id,
                        updated_at: new Date()
                    }
                ]);

            if (insertError) {
                console.error('Error inserting product:', insertError.message);
                return;
            }

            Toast.fire({
                icon: 'success',
                title: 'Product added successfully',
            });
            onClose();
            onProductAdded();
        } catch (error) {
            console.error('Error:', error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
                <form onSubmit={handleSubmit}>
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
                            className={`w-full p-2 border rounded-md ${errors.image ? 'border-red-500' : ''}`}
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        <small>Max file size: 200kb</small>
                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Preview"
                                    className=" h-32 object-cover rounded-md"
                                />
                            </div>
                        )}
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

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;