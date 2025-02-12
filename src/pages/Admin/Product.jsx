import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from 'lucide-react';
import DataTable from "react-data-table-component";
import { supabase } from "../../services/supabaseConfig";
import Swal from 'sweetalert2';
import { formatWIBTime } from "../../hooks/useFormatTime";
import { Link } from "react-router-dom";
import AddProductModal from "../../components/Admin/Product/add";
import EditProductModal from "../../components/Admin/Product/edit";
import { Toast } from "../../components/alert/toast";
import { formatIDR } from "../../hooks/useFormatIDR";
import { truncateContent } from "../../hooks/useTruncates";
const Product = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(
            (row) =>
                row.name.toLowerCase().includes(search.toLowerCase()) 
        );
        setFilteredProducts(filtered);
    }, [search, products]);
    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };
    const getProducts = async () => {
        setLoading(true);
        try {
            // Menggunakan join untuk mengambil data category
            const { data: products, error } = await supabase
                .from("product")
                .select(`
                    *,
                    category:category_id (
                        id,
                        name
                    )
                `);

            if (error) {
                console.log(error);
            }
            
            // Transform data untuk menyesuaikan dengan format yang dibutuhkan
            const transformedProducts = products.map(product => ({
                ...product,
                category_name: product.category?.name || 'Uncategorized' // Mengambil nama kategori
            }));

            setProducts(transformedProducts);
            setFilteredProducts(transformedProducts);
        } catch (error) {
            console.log(error);
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
            selector: (row) => truncateContent(row.description,10),
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => (
                <img
                    src={row.image_url}
                    alt={row.name}
                    className="w-24 h-24 object-cover rounded"
                />
            ),
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category_name, // Menampilkan nama kategori
            sortable: true,
        },
        {
            name: "Updated_at",
            selector: (row) => formatWIBTime(row.updated_at),
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
    
            // Step 1: Get product data by ID
            const { data: product, error: fetchError } = await supabase
                .from("product")
                .select("image_url")
                .eq("id", id)
                .single();
    
            if (fetchError) {
                console.error("Error fetching product:", fetchError);
                throw new Error("Failed to fetch product details");
            }
    
            // Step 2: Delete image from storage if exists
            if (product?.image_url) {
                try {
                    // Extract file path from the full URL
                    const filePath = product.image_url.split('/').slice(-1)[0];
                        
                    console.log("Attempting to delete file:", filePath);
    
                    const { error: deleteStorageError } = await supabase.storage
                        .from("product")
                        .remove([filePath]);
    
                    if (deleteStorageError) {
                        console.error("Error deleting file from storage:", deleteStorageError);
                        throw new Error("Failed to delete image from storage");
                    }
                } catch (storageError) {
                    console.error("Storage deletion error:", storageError);
                    // Continue with product deletion even if storage deletion fails
                    console.warn("Continuing with product deletion despite storage error");
                }
            }
    
            // Step 3: Delete product from database
            const { error: deleteError } = await supabase
                .from("product")
                .delete()
                .eq("id", id);
    
            if (deleteError) {
                console.error("Error deleting product:", deleteError);
                throw new Error("Failed to delete product from database");
            }
    
            // Success
            Toast.fire({
                icon: "success",
                title: "Product deleted successfully",
            });
            
            // Refresh product list
            await getProducts();
    
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
            for (const product of selectedRows) {
                // Step 1: Delete image from storage if exists
                if (product.image_url) {
                    try {
                        const filePath = product.image_url.split('/').slice(-1)[0];
                        const { error: deleteStorageError } = await supabase.storage
                            .from("product")
                            .remove([filePath]);

                        if (deleteStorageError) {
                            console.error("Error deleting file from storage:", deleteStorageError);
                        }
                    } catch (storageError) {
                        console.error("Storage deletion error for product:", product.id, storageError);
                    }
                }

                // Step 2: Delete product from database
                const { error: deleteError } = await supabase
                    .from("product")
                    .delete()
                    .eq("id", product.id);

                if (deleteError) {
                    console.error("Error deleting product:", product.id, deleteError);
                    throw new Error(`Failed to delete product ${product.id}`);
                }
            }

            // Success notification
            Toast.fire({
                icon: "success",
                title: `Successfully deleted ${selectedRows.length} product(s)`,
            });

            // Reset selected rows
            setSelectedRows([]);

            // Refresh product list
            await getProducts();

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
            <Sidebar active="Product"/>
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="flex items-center space-x-4 mb-3">
                        <Link to="/admin/dashboard">
                            <h1 className="text-sm font-bold hover:underline">Dashboard</h1>
                        </Link>
                        <ChevronRight size={16} />
                        <h1 className="text-sm font-bold">Product</h1>
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
                            Add Product
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
                        title="List Products"
                        columns={columns}
                        data={filteredProducts}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        onSelectedRowsChange={handleSelectedRowsChange}
                    />
                    {modalAdd && 
                    <AddProductModal 
                    onClose={() => setModalAdd(false)} 
                    onProductAdded={getProducts} /> }
                    {modalEdit && 
                    <EditProductModal 
                    id={editID} 
                    onClose={() => setModalEdit(false)} 
                    onProductUpdated={getProducts} /> }
                </main>
            </div>
        </div>
    );
};

export default Product;