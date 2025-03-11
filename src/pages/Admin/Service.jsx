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
import axios from "axios";
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
    const handleDeleteImage = async (imageId) => {
        try {
            await axios.delete(`https://image.miheelyu.my.id/delete/${imageId}`);
            console.log(imageId);
            const { error: deleteDBError } = await supabase
                .from('service_image')
                .delete()
                .eq('id_image', imageId);
    
            if (deleteDBError) throw new Error('Error deleting image from database');
        } catch (error) {
            console.error("Error deleting image:", error.message);
        }
    };
    const handleDelete = async (id) => {
        try {
            const { count, error: countError } = await supabase
                .from("service")
                .select("*", { count: "exact" });
    
            if (countError) throw new Error("Failed to check total records");
            if (count <= 3) {
                Swal.fire({
                    icon: "warning",
                    title: "Cannot Delete",
                    text: "Minimum 3 services must be maintained. You can only edit this record.",
                });
                return;
            }
    
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!",
            });
    
            if (!result.isConfirmed) return;
    
            const { data: serviceImages, error: fetchImageError } = await supabase
                .from("service_image")
                .select("id_image")
                .eq("service_id", id);
    
            if (fetchImageError) throw new Error("Failed to fetch service images");
    
            if (serviceImages?.length > 0) {
                await Promise.all(serviceImages.map(({ id_image }) => handleDeleteImage(id_image)));
            }
    
            const { error: deleteImagesError } = await supabase
                .from("service_image")
                .delete()
                .eq("service_id", id);
    
            if (deleteImagesError) throw new Error("Failed to delete service images from database");
    
            const { error: deleteServiceError } = await supabase
                .from("service")
                .delete()
                .eq("id", id);
    
            if (deleteServiceError) throw new Error("Failed to delete service from database");
    
            Swal.fire({ icon: "success", title: "Service deleted successfully" });
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
                const {data:serviceImages, error:imageError} = await supabase
                .from('service_image')
                .select('image_url, id_image')
                .eq('service_id', service.id);
    
                if (imageError) {
                    console.error("Error fetching service images:", imageError);
                    throw new Error(`Failed to fetch service images for service ${service.id}`);
                }

                if (serviceImages?.length > 0) {
                await Promise.all(serviceImages.map(({ id_image }) => handleDeleteImage(id_image)));
            }
                const { error: deleteImagesError } = await supabase
                .from("service_image")
                .delete()
                .eq("service_id", service.id);

                if (deleteImagesError) throw new Error("Failed to delete service images from database");
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