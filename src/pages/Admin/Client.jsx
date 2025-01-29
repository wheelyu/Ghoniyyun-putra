import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import Swal from "sweetalert2";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Toast } from "../../components/alert/toast";
const Client = () => {
    const [client, setClient] = useState([]);
    const [filteredClient, setFilteredClient] = useState([]); // Data yang ditampilkan
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // State untuk pencarian
    const [selectedClient, setSelectedClient] = useState(null); // State untuk data client yang akan ditampilkan di modal
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        // Filter data berdasarkan pencarian
        const filtered = client.filter(
            (row) =>
                row.name.toLowerCase().includes(search.toLowerCase()) ||
                row.email.toLowerCase().includes(search.toLowerCase()) ||
                row.number.toString().includes(search.toLowerCase()) ||
                row.topic.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredClient(filtered);
    }, [search, client]);
    const getClient = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("client").select("*");
        if (error) {
            console.log(error);
        } else {
            setClient(data);
            setFilteredClient(data); // Set data awal untuk ditampilkan
        }
        setLoading(false);
    };

    // Kolom untuk data table
    const columns = [
        {
            name: "Topic",
            selector: (row) => row.topic,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Phone",
            selector: (row) => row.number,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 relative"
                        onClick={() => handleRead(row)}
                    >
                        Read
                        {/* Lingkaran merah jika belum dibaca */}
                        {!row.read && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full "></span>
                        )}
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
    ];

    // Fungsi untuk menampilkan data di modal
    const handleRead = async (row) => {
        try {
            // Perbarui data 'read' menjadi true di database
            const { error } = await supabase
                .from("client")
                .update({ read: true })
                .eq("id", row.id);

            if (error) {
                console.log(error);
                Swal.fire("Error", "Gagal memperbarui data.", "error");
                return;
            }

            // Perbarui state lokal agar UI langsung diperbarui
            setClient((prevClient) =>
                prevClient.map((client) =>
                    client.id === row.id ? { ...client, read: true } : client
                )
            );

            // Set data klien yang dipilih dan buka modal
            setSelectedClient(row);
            setIsModalOpen(true);
        } catch (err) {
            console.log(err);
        }
    };
    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };
    // Fungsi untuk menghapus data
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
                    const { error } = await supabase.from("client").delete().eq("id", id);
                    if (error) {
                        console.log(error);
                    } else {
                        Toast.fire("Deleted!", "Your file has been deleted.", "success");
                        getClient();
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleReach = (number, name) => {
        const message = `Halo ${name}, saya dari customer service Ghoniyyun Petrol Teknik.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${number}?text=${encodedMessage}`);
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
            for (const client of selectedRows) {

                // Step 2: Delete product from database
                const { error: deleteError } = await supabase
                    .from("client")
                    .delete()
                    .eq("id", client.id);

                if (deleteError) {
                    console.error("Error deleting client:", client.id, deleteError);
                    throw new Error(`Failed to delete client ${client.id}`);
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
            await getClient();

        } catch (error) {
            console.error("Error in bulk deletion process:", error);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.message || "An unexpected error occurred during bulk deletion",
            });
        }
    };
    const handleBulkRead = async () => {
        try {
            // If no rows selected, return early
            if (selectedRows.length === 0) {
                Toast.fire({
                    icon: "warning",
                    title: "Please select products to read",
                });
                return;
            }

            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure?",
                text: `You are about to read ${selectedRows.length} product(s). This action cannot be undone!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, read all!",
            });           

            if (!result.isConfirmed) {
                return;
            }

            // Process each selected row
            for (const client of selectedRows) {

                // Step 2: Update product read status in database
                const { error: updateError } = await supabase
                    .from("client")
                    .update({ read: true })
                    .eq("id", client.id);

                if (updateError) {
                    console.error("Error updating client read status:", client.id, updateError);
                    throw new Error(`Failed to update client ${client.id} read status`);
                }
            }

            // Success notification
            Toast.fire({
                icon: "success",
                title: `Successfully read ${selectedRows.length} product(s)`,
            });

            // Reset selected rows
            setSelectedRows([]);

            // Refresh client list
            await getClient();

        } catch (error) {
            console.error("Error in bulk read process:", error);
            Swal.fire({
                icon: "error",
                title: "Read Failed",
                text: error.message || "An unexpected error occurred during bulk read",
            });
        }
    };
            
    return (
        <div className="flex min-h-screen">
            <Sidebar active="Client" />
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
                        <h1 className="text-sm font-bold ">Client</h1>
                    </div>
                    {/* Data Table */}
                    <div className="flex mb-4 gap-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2  w-full"
                        placeholder="Search by name, email, phone, topic"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {selectedRows.length > 0 && (
                            <div className="flex gap-2">
                                <button 
                                    className="w-[150px] text-xs bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    onClick={handleBulkDelete}
                                >
                                    Delete Selected ({selectedRows.length})
                                </button>
                                <button className="w-[150px] text-xs bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                    onClick={handleBulkRead}
                                >
                                    Read Selected ({selectedRows.length})
                                </button>
                            </div>
                        )}
                    </div>
                    <DataTable
                        title="List Client"
                        columns={columns}
                        data={filteredClient}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        onSelectedRowsChange={handleSelectedRowsChange}
                    />

                    {/* Modal Pop-Up */}
                    {isModalOpen && selectedClient && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg p-6 w-1/3">
                                <h2 className="text-lg font-bold mb-4">Detail Client</h2>
                                <div className="mb-2">
                                    <strong>Topic:</strong> {selectedClient.topic}
                                </div>
                                <div className="mb-2">
                                    <strong>Name:</strong> {selectedClient.name}
                                </div>
                                <div className="mb-2">
                                    <strong>Email:</strong> {selectedClient.email}
                                </div>
                                <div className="mb-2">
                                    <strong>Phone:</strong> {selectedClient.number}
                                </div>
                                <div className="mb-2">
                                    <strong>Company:</strong> {selectedClient.company}
                                </div>
                                <div className="mb-2 text-justify">
                                    <strong>Message:</strong> <br/> {selectedClient.message}
                                </div>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                                    onClick={() => handleReach(selectedClient.number, selectedClient.name)}
                                >
                                    Reach Client
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Client;
