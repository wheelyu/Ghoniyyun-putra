import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseConfig";
import Switch from "react-switch";
import { Toast } from "../../alert/toast";
const EditLink = ({  onClose, onLinkAdd, editID }) => {
    const [active, setActive] = useState(true);
    const [linkName, setLinkName] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        getLink();
    }, []);

    const getLink = async () => {
        try {
            const { data, error, status } = await supabase
                .from("link")
                .select("*")
                .eq("id", editID)
                .single(); // Gunakan single() karena kita hanya mengharapkan 1 data
    
            if (error && status !== 406) {
                throw error;
            }
    
            if (data) {
                setName(data.name);
                setLinkName(data.link);
                setActive(data.is_active);
            } else {
                throw new Error("Link not found");
            }
        } catch (error) {
            console.error("Error getting link:", error); // Tambahkan log error
            Toast.fire({
                icon: "error",
                title: "Error get link",
            });
        }
    };
    const handleClose = () => {
        onClose();
    }

    const handleSaveEdit = async () => {
        try {
            const { data, error } = await supabase
                .from("link")
                .update({  link: linkName})
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
                    title: "Link updated successfully",
                });
    
                // Panggil fungsi callback
                onLinkAdd();
                onClose();
            } else {
                throw new Error("No data updated");
            }
        } catch (error) {
            console.error("Error updating link:", error); // Tambahkan log error
            Toast.fire({
                icon: "error",
                title: "Error update link",
            });
        }
    };
    
    
            
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-[800px]">
                <h2 className="text-lg font-semibold mb-4">Edit Link</h2>
                <div className="flex flex-row gap-2 mb-2">
                <input
                    type="text"
                    placeholder="Link Name"
                    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-1/2 bg-gray-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={true}
                />
                <textarea
                            id="description"
                            className={`w-full p-2 border rounded-md `}
                            value={linkName}
                            onChange={(e) => setLinkName(e.target.value)}
                        ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveEdit}
                        disabled={linkName === ""}
                        className={`bg-green-500 text-white px-4 py-2 rounded mr-2
                        ${linkName === "" ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default EditLink;   