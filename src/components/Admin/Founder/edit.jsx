import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
import { use } from "react";

const EditFounder = ({ onClose, onFounderAdd, editID }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        image_url: '',
        quote: '',
        name: '',
    });
    
    useEffect(() => {
        getFounder();
    }, []);
    const getFounder = async () => {
        try {

            const { data, error, status } = await supabase
                .from("founder")
                .select("*")
                .eq("id", editID)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFormData({
                    image_url: data.image_url,
                    quote: data.quote,
                    name: data.name
                })
            } else {
                throw new Error("Founder not found");
            }
        } catch (error) {
            console.error("Error getting founder:", error);
            Toast.fire({
                icon: "error",
                title: "Error get founder",
            });
        }
    };


    const handleClose = () => {
        onClose();
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

        // quote validation
        if (!formData.quote.trim()) {
            tempErrors.quote = 'quote is required';
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

            const { error: uploadError } = await supabase.storage
                .from('founder')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = await supabase.storage
                .from('founder')
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
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
        try {
            let imageUrl = formData.image_url;
            
            // Only update image if a new file is selected
            if (formData.image_url instanceof File) {
                    // First, get the current product data to get the old image URL
                    const { data: currentPartnership, error: fetchError } = await supabase
                        .from('founder')
                        .select('image_url')
                        .eq('id', editID)
                        .single();
        
                    if (fetchError) {
                        throw new Error('Error fetching current founder data');
                    }
        
                    // Delete old image if it exists
                    if (currentPartnership?.image_url) {
                        try {
                            // Extract file path from the full URL
                            const oldFilePath = currentPartnership.image_url.split('/').slice(-1)[0];
        
                            console.log("Attempting to delete old file:", oldFilePath);
        
                            const { error: deleteError } = await supabase.storage
                                .from("founder")
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
            const { data, error } = await supabase
                .from("founder")
                .update({ 
                    image_url: imageUrl,
                    quote: formData.quote,
                    name: formData.name
                 })
                .eq("id", editID)
                .select();

            if (error) {
                throw error;
            }

            if (data && data.length > 0) {
                Toast.fire({
                    icon: "success",
                    title: "Founder updated successfully",
                });

                onFounderAdd();
                onClose();
            } else {
                throw new Error("No data updated");
            }
        } catch (error) {
            console.error("Error updating founder:", error);
            Toast.fire({
                icon: "error",
                title: "Error update founder",
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-[800px]">
                <h2 className="text-lg font-semibold mb-4">Edit Founder</h2>
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
                    <small>Max file size: 500kb</small>
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
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Quote:</label>
                    <input
                        type="text"
                        id="quote"
                        className={`w-full p-2 border rounded-md ${errors.quote ? 'border-red-500' : ''}`}
                        value={formData.quote}
                        onChange={handleInputChange}
                    />
                    {errors.quote && <p className="text-red-500 text-sm mt-1">{errors.quote}</p>}
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
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveEdit}
                        disabled={formData.name === "" || formData.image_url === "" || formData.quote === ""}
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2
                        ${(formData.name === "" || formData.image_url === "" || formData.quote === "") ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Save
                    </button>
                    <button
                        onClick={handleClose}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFounder;