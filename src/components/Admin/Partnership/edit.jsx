import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";

const EditPartnership = ({ onClose, onPartnershipEdit, editID }) => {
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        image_url: null,
        is_active: ''
    });

    useEffect(() => {
        getPartnership();
    }, []);

    const getPartnership = async () => {
        const { data, error } = await supabase
            .from('partnership')
            .select('*')
            .eq('id', editID)
            .single();

        if (error) {
            Toast.fire({
                icon: "error",
                title: error.message,
            });
        } else {
            setFormData({
                name: data.name,
                image_url: data.image_url,
            });
            setActive(data.is_active);
        }
    }

    const handleImageUpload = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('partnership-image')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = await supabase.storage
                .from('partnership-image')
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };

    const handleSwitchChange = () => {
        setActive(!active);
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
        setLoading(true);
        try {
            let imageUrl = formData.image_url;
            
            // Only update image if a new file is selected
            if (formData.image_url instanceof File) {
                imageUrl = await handleImageUpload(formData.image_url);
            }

            const { error } = await supabase
                .from('partnership')
                .update({
                    name: formData.name,
                    image_url: imageUrl,
                    is_active: active
                })
                .eq("id", editID);

            if (error) throw error;

            Toast.fire({
                icon: "success",
                title: "Partnership Updated successfully"
            });
            onPartnershipEdit();
            onClose();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Error Updating partnership"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Edit Partnership</h2>
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
                    {formData.image_url && !(formData.image_url instanceof File) && (
                        <img 
                            src={formData.image_url} 
                            alt="Current partnership" 
                            className="mt-2 h-20 object-contain"
                        />
                    )}
                    {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-600">Active:</label>
                    <Switch
                        onChange={handleSwitchChange}
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

export default EditPartnership;