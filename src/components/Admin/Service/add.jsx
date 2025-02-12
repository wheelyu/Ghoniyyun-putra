import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../services/supabaseConfig";
import { Toast } from "../../alert/toast";
const AddServiceModal = ({ onClose, onServiceAdded }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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


        // Image validation
        if (!formData.image) {
            tempErrors.image = 'Image is required';
            isValid = false;
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const maxSize = 200 * 1024; // 200 KB in bytes
        
            if (formData.image.size > maxSize) {
                tempErrors.image = 'Image size must not exceed 200KB';
                isValid = false;
            }
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
            if (!file) {
                throw new Error("No file provided");
            }
    
            const fileExt = file.name?.split('.').pop(); // Pastikan file.name ada
            if (!fileExt) {
                throw new Error("Invalid file name");
            }
    
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            console.log('add service image path: ' + filePath);
    
            const { data, error } = await supabase.storage
                .from('service')
                .upload(filePath, file);
    
            if (error) {
                throw error;
            }
    
            const { publicUrl } = supabase.storage
                .from('service')
                .getPublicUrl(filePath).data;
    
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
            // Insert service data first
            const { data: serviceData, error: insertError } = await supabase
                .from('service')
                .insert([
                    {
                        name: formData.name,
                        description: formData.description,
                        is_active: true
                    }
                ])
                .select('id')
                .single(); // Mengambil ID service yang baru dimasukkan
    
            if (insertError) {
                console.error('Error inserting service:', insertError.message);
                return;
            }
    
            const serviceId = serviceData.id; // Ambil ID dari service yang baru ditambahkan
    
            // Pastikan formData.image adalah array
            if (Array.isArray(formData.image) && formData.image.length > 0) {
                const uploadPromises = formData.image.map(async (file) => {
                    const imageUrl = await handleImageUpload(file);
                    return {
                        service_id: serviceId,
                        image_url: imageUrl
                    };
                });
    
                // Tunggu semua upload selesai
                const imageRecords = await Promise.all(uploadPromises);
    
                // Masukkan semua gambar ke dalam tabel serviceImage
                const { error: imageInsertError } = await supabase
                    .from('service_image')
                    .insert(imageRecords);
    
                if (imageInsertError) {
                    console.error('Error inserting service images:', imageInsertError.message);
                    return;
                }
            }
    
            Toast.fire({
                icon: 'success',
                title: 'Service added successfully',
            });
            onClose();
            onServiceAdded();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Add New Service</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Images:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            multiple
                            className={`w-full p-2 border rounded-md ${errors.image ? 'border-red-500' : ''}`}
                            onChange={(e) => setFormData({ 
                                ...formData, 
                                image: [...e.target.files] // Menyimpan semua file dalam array
                            })}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        <small>Max file size: 200kb per file</small>

                        {/* Menampilkan preview dari semua gambar yang dipilih */}
                        {formData.image && formData.image.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {formData.image.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        className="h-32 object-cover rounded-md"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

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
                            className={`w-full p-2 border rounded-md `}
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2">
                    <button
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
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;