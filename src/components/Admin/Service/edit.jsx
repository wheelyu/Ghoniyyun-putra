import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
import  Swal  from "sweetalert2";
import axios from "axios";
const EditServices = ({ onClose, onServiceUpdated, id }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [active, setActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image_url: null,
    });

    useEffect(() => {
            getServices();
        }, []);
    
        const getServices = async () => {
            try {
                // Ambil data service berdasarkan ID
                const { data: serviceData, error: serviceError } = await supabase
                    .from('service')
                    .select('*')
                    .eq('id', id)
                    .single();
        
                if (serviceError) {
                    throw new Error(serviceError.message);
                }
        
                // Ambil semua image_url dari tabel service_image berdasarkan service_id
                const { data: serviceImages, error: imageError } = await supabase
                    .from('service_image')
                    .select('image_url')
                    .eq('service_id', id);
        
                if (imageError) {
                    throw new Error(imageError.message);
                }
        
                // Ambil semua URL gambar atau set array kosong jika tidak ada gambar
                const imageUrls = serviceImages?.map(img => img.image_url) || [];
        
                // Update state dengan data yang diperoleh
                setFormData({
                    image_url: imageUrls, // Menggunakan array jika ada beberapa gambar
                    name: serviceData.name,
                    description: serviceData.description,
                });
        
                setActive(serviceData.is_active);
                
            } catch (error) {
                console.error("Error fetching service data:", error);
                Toast.fire({
                    icon: "error",
                    title: error.message || "Failed to fetch service data",
                });
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
                setErrors(tempErrors);
                return isValid;
            };
            const handleImageUpload = async (file) => {
                    try {
                        if (!file) {
                            throw new Error("No file provided");
                        }
                
                        const formData = new FormData();
                        formData.append('image', file);
                
                        const response = await axios.post('https://image.miheelyu.my.id/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                
                        const fileName = response.data.image.filename;
                        const id = response.data.image.id;
                        return { id, image_url: `https://image.miheelyu.my.id/uploads/${fileName}` };
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
    const handleSwitchChange = () => {
        setActive(!active);
    };
    const handleDeleteImage = async (imageId) => {
        try {
            await axios.delete(`https://image.miheelyu.my.id/delete/${imageId}`);
    
            const { error: deleteDBError } = await supabase
                .from('service_image')
                .delete()
                .eq('id_image', imageId);
    
            if (deleteDBError) throw new Error('Error deleting image from database');
        } catch (error) {
            console.error("Error deleting image:", error.message);
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
            const { data: oldImages, error: fetchError } = await supabase
                .from('service_image')
                .select('image_url, id_image')
                .eq('service_id', id);
    
            if (fetchError) {
                throw new Error('Error fetching current service images');
            }
    
            const oldImageRecords = oldImages.map(img => ({ id_image: img.id_image, url: img.image_url }));
            const newImageFiles = formData.image_url.filter(file => file instanceof File);
            const newImageUrls = formData.image_url.filter(url => typeof url === "string");
    
            const imagesToDelete = oldImageRecords.filter(img => !newImageUrls.includes(img.url));
            if (imagesToDelete.length > 0) {
                await Promise.all(imagesToDelete.map(img => handleDeleteImage(img.id_image)));
            }
    
            let uploadedImages = [...newImageUrls];
            if (newImageFiles.length > 0) {
                const uploadPromises = newImageFiles.map(async (file) => {
                    const { id, image_url } = await handleImageUpload(file);
                    return { id_image: id, image_url: image_url };
                });
    
                const uploadedData = await Promise.all(uploadPromises);
                uploadedImages = [...uploadedImages, ...uploadedData.map(data => data.image_url)];
    
                const newImageRecords = uploadedData.map(({ id_image, image_url }) => ({
                    service_id: id,
                    id_image: id_image,
                    image_url: image_url
                }));
    
                const { error: insertImageError } = await supabase
                    .from('service_image')
                    .insert(newImageRecords);
    
                if (insertImageError) {
                    console.error("Error inserting new images:", insertImageError);
                }
            }
    
            const { error: updateError } = await supabase
                .from('service')
                .update({
                    name: formData.name,
                    description: formData.description,
                    is_active: formData.is_active
                })
                .eq("id", id);
    
            if (updateError) throw updateError;
    
            Swal.fire({
                icon: "success",
                title: "Service updated successfully"
            });
            onServiceUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating service:", error);
            Swal.fire({
                icon: "error",
                title: error.message || "Error updating service"
            });
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-1/2">
                <h2 className="text-lg font-semibold mb-4">Edit Service</h2>
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
                            rows="4"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        multiple // Menambahkan multiple agar bisa pilih banyak gambar
                        className={`w-full p-2 border rounded-md ${errors.image_url ? 'border-red-500' : ''}`}
                        onChange={(e) => {
                            const selectedFiles = Array.from(e.target.files); // Mengubah FileList menjadi array
                            setFormData(prev => ({
                                ...prev,
                                image_url: selectedFiles
                            }));
                            if (errors.image_url) {
                                setErrors(prev => ({
                                    ...prev,
                                    image_url: ''
                                }));
                            }
                        }}
                    />

                    {/* Tampilkan Preview untuk Semua Gambar */}
                    {formData.image_url && Array.isArray(formData.image_url) && (
                        <div className="mt-2 flex flex-wrap gap-5">
                            {formData.image_url.map((file, index) => {
                                const isFile = file instanceof File;
                                return (
                                    <img
                                        key={index}
                                        src={isFile ? URL.createObjectURL(file) : file} // Jika file baru, gunakan createObjectURL
                                        alt={`Preview ${index}`}
                                        className="h-20 object-contain rounded-md"
                                    />
                                );
                            })}
                        </div>
                    )}


                    {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="text-gray-600">Active:</label>
                        <Switch
                            onChange={() => {handleSwitchChange()}}
                            checked={active}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            className="react-switch"
                        />
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

export default EditServices;