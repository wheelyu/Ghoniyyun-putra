import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AddCategoryModal from "../../components/Admin/Categories/add";
import EditCategoryModal from "../../components/Admin/Categories/edit";
import { Toast } from "../../components/alert/toast";
const Category = () => {
    const [category, setCategory] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [search, setSearch] = useState(""); // State untuk pencarian\
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        getCategory();
    }, []);
    useEffect(() => {
            // Filter data berdasarkan pencarian
            const filtered = category.filter(
                (row) =>
                    row.name.toLowerCase().includes(search.toLowerCase()) 
            );
            setFilteredCategory(filtered);
        }, [search, category]);
    const getCategory = async () => {
        setLoading(true);
        try {
            const { data, error, status } = await supabase
            .from('categories')
            .select('*')
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setCategory(data)
                setFilteredCategory(data)
            }
        } catch (error) {
            alert(error.message)
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
                    // Cek apakah kategori masih digunakan di tabel product
                    const { data: products, error: checkError } = await supabase
                        .from("product")
                        .select("id")
                        .eq("category_id", id);
    
                    if (products && products.length > 0) {
                        // Jika masih ada produk yang menggunakan kategori ini
                        Toast.fire({
                            icon: "error",
                            title: "Cannot Delete Category",
                            text: "This category is still being used by some products. Please remove or update those products first.",
                            confirmButtonColor: "#3085d6",
                        });
                        return;
                    }
    
                    // Jika tidak ada produk yang menggunakan, lanjutkan dengan penghapusan
                    const { error: deleteError } = await supabase
                        .from("categories")
                        .delete()
                        .eq("id", id);
    
                    if (deleteError) {
                        Toast.fire({
                            icon: "error",
                            title: "Error",
                            text: "An error occurred while deleting the category.",
                            confirmButtonColor: "#3085d6",
                        });
                        console.log(deleteError);
                    } else {
                        Toast.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Category has been deleted successfully.",
                            confirmButtonColor: "#3085d6",
                        });
                        getCategory();
                    }
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred.",
                confirmButtonColor: "#3085d6",
            });
        }
    };
    const handleBulkDelete = async () => {
        try {
            // If no rows selected, return early
            if (selectedRows.length === 0) {
                Toast.fire({
                    icon: "warning",
                    title: "Please select categories to delete",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }
    
            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure?",
                text: `You are about to delete ${selectedRows.length} category(ies). This action cannot be undone!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete all!",
            });
    
            if (result.isConfirmed) {
                // Check if any of the selected categories are being used by products
                for (const category of selectedRows) {
                    const { data: products, error: checkError } = await supabase
                        .from("product")
                        .select("id")
                        .eq("category_id", category.id);
    
                    if (products && products.length > 0) {
                        // If category is being used, show error and stop the deletion process
                        Toast.fire({
                            icon: "error",
                            title: "Cannot Delete Categories",
                            text: `Category "${category.name}" is still being used by some products. Please remove or update those products first.`,
                            confirmButtonColor: "#3085d6",
                        });
                        return;
                    }
                }
    
                // If no categories are being used, proceed with deletion
                let hasError = false;
                for (const category of selectedRows) {
                    const { error: deleteError } = await supabase
                        .from("categories")
                        .delete()
                        .eq("id", category.id);
    
                    if (deleteError) {
                        hasError = true;
                        console.log(`Error deleting category ${category.id}:`, deleteError);
                    }
                }
    
                // Show appropriate notification based on operation result
                if (hasError) {
                    Toast.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred while deleting some categories.",
                        confirmButtonColor: "#3085d6",
                    });
                } else {
                    Toast.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: `${selectedRows.length} categories have been deleted successfully.`,
                        confirmButtonColor: "#3085d6",
                    });
    
                    // Reset selected rows
                    setSelectedRows([]);
                    
                    // Refresh category list
                    getCategory();
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred.",
                confirmButtonColor: "#3085d6",
            });
        }
    };
    return <div className="flex min-h-screen">
        <Sidebar active="Category"/>
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
                        <h1 className="text-sm font-bold ">Categories</h1>
                    </div>
                    {/* Data Table */}
                    <div className=" flex mb-4 gap-1">
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2  w-full"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="w-[150px] bg-green-500 text-white p-2  rounded hover:bg-green-600" onClick={() => setModalAdd(true)}>
                            Add Category
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
                        title="List Categories"
                        columns={columns}
                        data={filteredCategory}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        onSelectedRowsChange={handleSelectedRowsChange}
                    />
                    {/* Modal Add */}
                    {modalAdd && (
                        <AddCategoryModal
                            onClose={() => setModalAdd(false)}
                            onCategoryAdded={getCategory}
                        />
                    )}
                    {/* Modal Edit */}
                    {modalEdit && (
                        <EditCategoryModal
                            onClose={() => setModalEdit(false)}
                            onCategoryAdd={getCategory}
                            editID={editID}
                        />
                    )}
            </main>
        </div>
    </div>
}

export default Category;