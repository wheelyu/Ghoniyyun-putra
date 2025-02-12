import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
import  Swal  from "sweetalert2";

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
            // Ambil semua gambar lama dari tabel service_image berdasarkan service_id
            const { data: oldImages, error: fetchError } = await supabase
                .from('service_image')
                .select('image_url')
                .eq('service_id', id);
    
            if (fetchError) {
                throw new Error('Error fetching current service images');
            }
    
            // Jika ada gambar lama, hapus dari Supabase Storage
            if (oldImages.length > 0) {
                const oldFilePaths = oldImages.map(img => img.image_url.split('/').slice(-1)[0]);
    
                console.log("Attempting to delete old files:", oldFilePaths);
    
                const { error: deleteError } = await supabase.storage
                    .from("service")
                    .remove(oldFilePaths);
    
                if (deleteError) {
                    console.warn("Error deleting old images:", deleteError);
                }
    
                // Hapus semua record lama dari tabel service_image
                const { error: deleteDBError } = await supabase
                    .from('service_image')
                    .delete()
                    .eq('service_id', id);
    
                if (deleteDBError) {
                    console.warn("Error deleting old image records:", deleteDBError);
                }
            }
    
            let uploadedImages = [];
    
            // Upload file baru jika ada
            if (Array.isArray(formData.image_url) && formData.image_url.length > 0) {
                const uploadPromises = formData.image_url.map(async (file) => {
                    const imageUrl = await handleImageUpload(file);
                    return {
                        service_id: id,
                        image_url: imageUrl
                    };
                });
    
                // Tunggu semua upload selesai
                uploadedImages = await Promise.all(uploadPromises);
    
                // Masukkan semua gambar baru ke dalam tabel service_image
                const { error: insertImageError } = await supabase
                    .from('service_image')
                    .insert(uploadedImages);
    
                if (insertImageError) {
                    console.error("Error inserting new images:", insertImageError);
                }
            }
    
            // Update data service
            const { error: updateError } = await supabase
                .from('service')
                .update({
                    name: formData.name,
                    description: formData.description,
                    is_active: active
                })
                .eq("id", id);
    
            if (updateError) throw updateError;
    
            Toast.fire({
                icon: "success",
                title: "Service updated successfully"
            });
            onServiceUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating service:", error);
            Toast.fire({
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
                    <small>Max file size: 200kb</small>

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