import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from 'lucide-react';
import DataTable from "react-data-table-component";
import { supabase } from "../../services/supabaseConfig";
import Swal from 'sweetalert2';
import { formatWIBTime } from "../../hooks/useFormatTime";
import { Link } from "react-router-dom";
import AddProductModal from "../../components/Admin/Product/add";
const Product = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
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
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => (
                <img
                    src={row.image}
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

    return (
        <div className="flex h-screen">
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
                    <div className="flex mb-4 gap-1">
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full"
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
                    />
                    {modalAdd && 
                    <AddProductModal 
                    onClose={() => setModalAdd(false)} 
                    onProductAdded={getProducts} /> }
                </main>
            </div>
        </div>
    );
};

export default Product;