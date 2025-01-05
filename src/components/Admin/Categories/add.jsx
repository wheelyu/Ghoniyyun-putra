import React, { useState } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
const AddCategory = ({  onClose, onCategoryAdded }) => {
    const [active, setActive] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const handleClose = () => {
        onClose();
    }

    const handleSwitchChange = () => {
        setActive(!active);
    };

    const handleSave = async () => {
        try {
            const { data, error } = await supabase.from("categories").insert({
                name: categoryName,
                is_active: active,
            });
            if (error) {
                console.log(error);
            } else {
                Toast.fire({
                    icon: "success",
                    title: "Category added successfully",
                });
                onCategoryAdded();
                onClose();
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Error adding category",
            })
        }
    };
            
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Add Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
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
                        onClick={handleSave}
                        disabled={categoryName === ""}
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2
                        ${categoryName === "" ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default AddCategory;