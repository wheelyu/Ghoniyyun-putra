import React, { useState } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";

const AddPartnership = ({ onClose, onPartnershipAdded }) => {
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        image_url: null,
        is_active: ''
    });

    const validateForms = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.length < 3) {
            tempErrors.name = 'Name must be at least 3 characters long';
            isValid = false;
        }

        if (!formData.image_url) {
            tempErrors.image_url = 'Image is required';
            isValid = false;
        } else if (formData.image_url instanceof File) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(formData.image_url.type)) {
                tempErrors.image_url = 'Invalid image format. Only JPEG, PNG, and GIF are allowed.';
                isValid = false;
            } else if (formData.image_url.size > 204800) {
                tempErrors.image_url = 'Image size should not exceed 200kb.';
                isValid = false;
            }
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
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };
    const handleSave = async () => {
        if (!validateForms()) {
            Toast.fire({
                icon: "error",
                title: "Please fix the errors before submitting"
            });
            return;
        }

        setLoading(true);
        try {
            let imageUrl = null;
            if (formData.image_url instanceof File) {
                imageUrl = await handleImageUpload(formData.image_url);
            }

            const { error } = await supabase
                .from('partnership')
                .insert([{
                    name: formData.name,
                    image_url: imageUrl,
                    is_active: active
                }]);

            if (error) throw error;

            Toast.fire({
                icon: "success",
                title: "Partnership added successfully"
            });
            onPartnershipAdded();
            onClose();
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Error adding partnership"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Add Partnership</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                        value={formData.name}
                        onChange={(e) => {
                            handleInputChange(e);
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
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
                            setFormData({ ...formData, image_url: e.target.files[0] });
                            if (errors.image_url) setErrors({ ...errors, image_url: '' });
                        }}
                    />
                    <small>Max file size: 200kb</small>
                    {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                    {formData.image_url && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.image_url)}
                                    alt="Preview"
                                    className=" h-32 object-cover rounded-md"
                                />
                            </div>
                        )}
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
                        onClick={handleSave}
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

export default AddPartnership;