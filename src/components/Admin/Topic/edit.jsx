import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
const EditTopic = ({  onClose, onTopicAdd, editID }) => {
    const [active, setActive] = useState(true);
    const [topicName, setTopicName] = useState("");

    useEffect(() => {
        getTopic();
    }, []);

    const getTopic = async () => {
        try {
            const { data, error, status } = await supabase
                .from("topic")
                .select("*")
                .eq("id", editID)
                .single(); // Gunakan single() karena kita hanya mengharapkan 1 data
    
            if (error && status !== 406) {
                throw error;
            }
    
            if (data) {
                setTopicName(data.name);
                setActive(data.is_active);
            } else {
                throw new Error("Topic not found");
            }
        } catch (error) {
            console.error("Error getting topic:", error); // Tambahkan log error
            Toast.fire({
                icon: "error",
                title: "Error get topic",
            });
        }
    };
    const handleClose = () => {
        onClose();
    }

    const handleSwitchChange = () => {
        setActive(!active);
    };

    const handleSaveEdit = async () => {
        try {
            const { data, error } = await supabase
                .from("topic")
                .update({ name: topicName, is_active: active })
                .eq("id", editID)
                .select(); // Tambahkan .select() untuk mendapatkan data yang diupdate
    
            // Cek jika ada error
            if (error) {
                throw error;
            }
    
            // Cek apakah data berhasil diupdate
            if (data && data.length > 0) {
                // Jika berhasil
                Toast.fire({
                    icon: "success", 
                    title: "Topic updated successfully",
                });
    
                // Panggil fungsi callback
                onTopicAdd();
                onClose();
            } else {
                throw new Error("No data updated");
            }
        } catch (error) {
            console.error("Error updating topic:", error); // Tambahkan log error
            Toast.fire({
                icon: "error",
                title: "Error update topic",
            });
        }
    };
    
    
            
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Edit Topic</h2>
                <input
                    type="text"
                    placeholder="Topic Name"
                    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
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
                        onClick={handleSaveEdit}
                        disabled={topicName === ""}
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2
                        ${topicName === "" ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default EditTopic;