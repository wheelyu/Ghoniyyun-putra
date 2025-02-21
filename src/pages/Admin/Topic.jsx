import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import Swal from "sweetalert2";
import { Toast } from "../../components/alert/toast";
import AddTopicModal from "../../components/Admin/Topic/add";
import EditTopicModal from "../../components/Admin/Topic/edit";
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [topic, setTopic] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTopic, setFilteredTopic] = useState([]); // Data yang ditampilkan
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        getTopic();
    }, []);

    useEffect(() => {
        // Filter data berdasarkan pencarian
        const filtered = topic.filter(
            (row) =>
                row.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTopic(filtered);
    }, [topic, search]);
    const getTopic = async () => {
        try {
            setLoading(true);
            const { data: topic, error } = await supabase
                .from("topic")
                .select("*");
            if (error) {
                throw error;
            }
            setTopic(topic);
            console.log(topic);
            setFilteredTopic(topic);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "active",
                selector: (row) => (
                    <div>
                        {row.is_active ? (
                            <span className="text-green-500">Active</span>
                        ) : (
                            <span className="text-red-500">Not Active</span>
                        )}
                    </div>
                ),
                sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 relative"
                        onClick={() => handleEdit(row)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ]
    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };
    const handleEdit = (row) => {
        setEditID(row.id);
        setModalEdit(true);
    };
    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!",
            }).then(async (result) => {
            if (result.isConfirmed) {
                const { error } = await supabase.from("topic").delete().eq("id", id);
                if (error) {
                Toast.fire({
                    icon: "error",
                    title: error.message,
                })
                } else {
                Toast.fire({
                    icon: "success",
                    title: "Deleted successfully",
                });
                }
                getTopic();
            }
            });
        } catch (error) {
            Toast.fire({
            icon: "error",
            title: error.message,
            })
            }
    };
        const handleBulkDelete = async () => {
                try {
                    // If no rows selected, return early
                    if (selectedRows.length === 0) {
                        Toast.fire({
                            icon: "warning",
                            title: "Please select products to delete",
                        });
                        return;
                    }
        
                    // Show confirmation dialog
                    const result = await Swal.fire({
                        title: "Are you sure?",
                        text: `You are about to delete ${selectedRows.length} product(s). This action cannot be undone!`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete all!",
                    });
        
                    if (!result.isConfirmed) {
                        return;
                    }
        
                    // Process each selected row
                    for (const topic of selectedRows) {
        
                        // Step 2: Delete product from database
                        const { error: deleteError } = await supabase
                            .from("topic")
                            .delete()
                            .eq("id", topic.id);
        
                        if (deleteError) {
                            console.error("Error deleting topic:", topic.id, deleteError);
                            throw new Error(`Failed to delete topic ${topic.id}`);
                        }
                    }
        
                    // Success notification
                    Toast.fire({
                        icon: "success",
                        title: `Successfully deleted ${selectedRows.length} product(s)`,
                    });
        
                    // Reset selected rows
                    setSelectedRows([]);
        
                    // Refresh client list
                    await getTopic();
        
                } catch (error) {
                    console.error("Error in bulk deletion process:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Delete Failed",
                        text: error.message || "An unexpected error occurred during bulk deletion",
                    });
                }
            };

    return (
        <div className="flex min-h-screen">
            <Sidebar active="Topic" />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100">
                <div className="flex items-center space-x-4 mb-3">
                        <Link
                            to="/admin/dashboard"
                            >
                        <h1 className="text-sm font-bold hover:underline">Dashboard</h1>
                        </Link>
                        <ChevronRight size={16} />
                        <h1 className="text-sm font-bold ">Topic</h1>
                    </div>
                    <div className=" flex mb-4 gap-1">
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2  w-full"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="w-[150px] bg-green-500 text-white p-2  rounded hover:bg-green-600" onClick={() => setModalAdd(true)}>
                            Add Topic
                    </button>
                    {selectedRows.length > 0 && (
                            <button 
                                className="w-[150px] text-xs bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                onClick={handleBulkDelete}
                            >
                                Delete Selected ({selectedRows.length})
                            </button>
                    )}
                    </div>
                    <DataTable
                        title="List Topics"
                        columns={columns}
                        data={filteredTopic}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        onSelectedRowsChange={handleSelectedRowsChange}
                    />
                    {/* Modal Add */}
                    {modalAdd && (
                        <AddTopicModal
                            onClose={() => setModalAdd(false)}
                            onTopicAdded={getTopic}
                        />
                    )}
                    {/* Modal Edit */}
                    {modalEdit && (
                        <EditTopicModal
                            onClose={() => setModalEdit(false)}
                            onTopicAdd={getTopic}
                            editID={editID}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
