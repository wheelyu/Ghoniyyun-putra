import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from 'lucide-react';
import DataTable from "react-data-table-component";
import { supabase } from "../../services/supabaseConfig";
import Swal from 'sweetalert2';
import { formatWIBTime } from "../../hooks/useFormatTime";
import { Link } from "react-router-dom";
import AddServiceModal from "../../components/Admin/Service/add";
import EditServiceModal from "../../components/Admin/Service/edit";
import { Toast } from "../../components/alert/toast";
import { formatIDR } from "../../hooks/useFormatIDR";
import { truncateContent } from "../../hooks/useTruncates";
import { data } from "autoprefixer";
const Service = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        getServices();
    }, []);

    useEffect(() => {
        const filtered = services.filter(
            (row) =>
                row.name.toLowerCase().includes(search.toLowerCase()) 
        );
        setFilteredServices(filtered);
    }, [search, services]);
    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };
    const getServices = async () => {
        setLoading(true);
        try {
            // Menggunakan join untuk mengambil data category
            const { data: services, error } = await supabase
                .from("service")
                .select(`*`);

            if (error) {
                throw error;
            }
            if  ( data ){
                setServices(services);
                setFilteredServices(services);
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Error fetching services",
            })
        }
        setLoading(false);
    }

    const columns = [
  
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description ? truncateContent(row.description,10) : "no description",
            sortable: true,
        },
        {
            name: "is_active",
            selector: (row) => (
                <span className={`px-4 py-2 rounded ${row.is_active ? "text-green-500" : "text-red-500"}`}>{row.is_active ? "Active" : "Not Active"}</span>

            ),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
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
    ];
    const handleEdit = (row) => {
        setEditID(row.id);
        setModalEdit(true);
    };
    const handleDelete = async (id) => {
        try {
            // Cek jumlah total service yang tersedia
            const { count, error: countError } = await supabase
                .from("service")
                .select('*', { count: 'exact' });
    
            if (countError) {
                console.error("Error counting records:", countError);
                throw new Error("Failed to check total records");
            }
    
            // Jika jumlah service kurang dari atau sama dengan 3, cegah penghapusan
            if (count <= 3) {
                Swal.fire({
                    icon: "warning",
                    title: "Cannot Delete",
                    text: "Minimum 3 services must be maintained. You can only edit this record.",
                });
                return;
            }
    
            // Konfirmasi sebelum menghapus
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!",
            });
    
            if (!result.isConfirmed) {
                return;
            }
    
            // Ambil semua gambar yang terkait dari service_image
            const { data: serviceImages, error: fetchImageError } = await supabase
                .from("service_image")
                .select("id, image_url")
                .eq("service_id", id);
    
            if (fetchImageError) {
                console.error("Error fetching service images:", fetchImageError);
                throw new Error("Failed to fetch service images");
            }
    
            // Hapus semua gambar dari storage jika ada
            if (serviceImages?.length > 0) {
                const imagePaths = serviceImages.map(img => img.image_url.split('/').slice(-1)[0]);
    
                console.log("Attempting to delete files:", imagePaths);
    
                const { error: deleteStorageError } = await supabase.storage
                    .from("service")
                    .remove(imagePaths);
    
                if (deleteStorageError) {
                    console.error("Error deleting files from storage:", deleteStorageError);
                    throw new Error("Failed to delete images from storage");
                }
            }
    
            // Hapus semua entri gambar dari service_image sebelum menghapus service
            const { error: deleteImagesError } = await supabase
                .from("service_image")
                .delete()
                .eq("service_id", id);
    
            if (deleteImagesError) {
                console.error("Error deleting service images:", deleteImagesError);
                throw new Error("Failed to delete service images from database");
            }
    
            // Hapus service dari database
            const { error: deleteServiceError } = await supabase
                .from("service")
                .delete()
                .eq("id", id);
    
            if (deleteServiceError) {
                console.error("Error deleting service:", deleteServiceError);
                throw new Error("Failed to delete service from database");
            }
    
            // Berhasil
            Toast.fire({
                icon: "success",
                title: "Service deleted successfully",
            });
    
            // Refresh data service setelah penghapusan
            await getServices();
    
        } catch (error) {
            console.error("Error in deletion process:", error);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.message || "An unexpected error occurred",
            });
        }
    };
    
    
    const handleBulkDelete = async () => {
        try {
            // If no rows selected, return early
            if (selectedRows.length === 0) {
                Toast.fire({
                    icon: "warning",
                    title: "Please select services to delete",
                });
                return;
            }
    
            // Check total records in database
            const { count, error: countError } = await supabase
                .from("service")
                .select('*', { count: 'exact' });
    
            if (countError) {
                console.error("Error counting records:", countError);
                throw new Error("Failed to check total records");
            }
    
            // Calculate remaining records after deletion
            const remainingCount = count - selectedRows.length;
    
            // If remaining records would be less than 3, prevent deletion
            if (remainingCount < 3) {
                Swal.fire({
                    icon: "warning",
                    title: "Cannot Delete",
                    text: `Deletion not allowed. You must maintain at least 3 services. Current selection would leave only ${remainingCount} service(s).`,
                });
                return;
            }
    
            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure?",
                text: `You are about to delete ${selectedRows.length} service(s). This action cannot be undone!`,
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
            for (const service of selectedRows) {
                // Step 1: Delete image from storage if exists
                if (service.image_url) {
                    try {
                        const filePath = service.image_url.split('/').slice(-1)[0];
                        const { error: deleteStorageError } = await supabase.storage
                            .from("service")
                            .remove([filePath]);
    
                        if (deleteStorageError) {
                            console.error("Error deleting file from storage:", deleteStorageError);
                        }
                    } catch (storageError) {
                        console.error("Storage deletion error for service:", service.id, storageError);
                    }
                }
    
                // Step 2: Delete product from database
                const { error: deleteError } = await supabase
                    .from("service")
                    .delete()
                    .eq("id", service.id);
    
                if (deleteError) {
                    console.error("Error deleting service:", service.id, deleteError);
                    throw new Error(`Failed to delete service ${service.id}`);
                }
            }
    
            // Success notification
            Toast.fire({
                icon: "success",
                title: `Successfully deleted ${selectedRows.length} service(s)`,
            });
    
            // Reset selected rows
            setSelectedRows([]);
    
            // Refresh service list
            await getServices();
    
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
            <Sidebar active="Service"/>
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="flex items-center space-x-4 mb-3">
                        <Link to="/admin/dashboard">
                            <h1 className="text-sm font-bold hover:underline">Dashboard</h1>
                        </Link>
                        <ChevronRight size={16} />
                        <h1 className="text-sm font-bold">Service</h1>
                    </div>
                    <div className="flex mb-4 gap-2">
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 flex-1"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button 
                            className="w-[150px] bg-green-500 text-white p-2 rounded hover:bg-green-600" 
                            onClick={() => setModalAdd(true)}
                        >
                            Add Service
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
                        title="List Services"
                        columns={columns}
                        data={filteredServices}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        onSelectedRowsChange={handleSelectedRowsChange}
                    />
                    {modalAdd && 
                    <AddServiceModal 
                    onClose={() => setModalAdd(false)} 
                    onServiceAdded={getServices} /> }
                    {modalEdit && 
                    <EditServiceModal 
                    id={editID} 
                    onClose={() => setModalEdit(false)} 
                    onServiceUpdated={getServices} /> }
                </main>
            </div>
        </div>
    );
};

export default Service;