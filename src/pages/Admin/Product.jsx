import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/sidebar";
import Header from "../../components/Admin/Header";
import { getCategories, getPosts } from "../../services/api";
import { formatWIBTime } from "../../hooks/useFormatTime";
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import AddProductModal from "../../components/Admin/AddProduct";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortCategory, setSortCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await getPosts();
                const allProducts = productsResponse.data;
                setProducts(allProducts);
                setFilteredProducts(allProducts);

                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse.data);

                const categoriesMap = categoriesResponse.data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {});
                setCategoryMap(categoriesMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const getCategoryName = (categoryId) => {
        return categoryMap[categoryId] || 'Tidak Diketahui';
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        const value = e.target.value;
        setSortCategory(value);
        let sorted = [...filteredProducts];

        if (value === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "category") {
            sorted.sort((a, b) => getCategoryName(a.category_id).localeCompare(getCategoryName(b.category_id)));
        } else if (value === "stock desc") {
            sorted.sort((a, b) => b.stock - a.stock);
        } else if (value === "stock asc") {
            sorted.sort((a, b) => a.stock - b.stock);
        }
        
        setFilteredProducts(sorted);
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleChangePage = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Produk yang ada di website</h1>
                    <div className="flex justify-between items-center my-5">
                        <div className="relative flex-grow mr-4">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" />
                        </div>

                        <select
                            value={sortCategory}
                            onChange={handleSort}
                            className="py-2 px-4 border rounded-lg"
                        >
                            <option value="">Sort by</option>
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="stock asc">Stock terendah</option>
                            <option value="stock desc">Stock tertinggi</option>
                        </select>

                        <AddProductModal />
                    </div>

                    <div className="overflow-x-auto h-[500px]">
                        <table className="w-full table-auto bg-white rounded-xl">
                            <thead className="bg-primary">
                                <tr>
                                    <th className="w-12 px-4 text-start py-2 border">No</th>
                                    <th className="w-40 px-4 text-start py-2 border">Name</th>
                                    <th className="w-60 px-4 text-start py-2 border">Description</th>
                                    <th className="w-32 px-4 text-start py-2 border">Category</th>
                                    <th className="w-32 px-4 text-start py-2 border">Image</th>
                                    <th className="w-24 px-4 text-start py-2 border">Active</th>
                                    <th className="w-40 px-4 text-start py-2 border">Stok</th>
                                    <th className="w-40 px-4 text-start py-2 border">Updated At</th>
                                    <th className="w-40 px-4 text-start py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="w-12 px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="w-40 px-4 py-2">{item.name}</td>
                                        <td className="w-60 px-4 py-2">{item.description}</td>
                                        <td className="w-32 px-4 py-2">{getCategoryName(item.category_id)}</td>
                                        <td className="w-32 px-4 py-2">
                                            <img src={`http://localhost:5000/uploads/products/${item.image}`} alt={item.name} className="w-[100px] h-[100px]" />
                                        </td>
                                        <td className="w-24 px-4 py-2">{item.is_active ? "Yes" : "No"}</td>
                                        <td className="w-40 px-4 py-2">{item.stock}</td>
                                        <td className="w-40 px-4 py-2">{formatWIBTime(item.updatedAt)}</td>
                                        <td className="w-40 px-4 py-2">
                                            <div className="flex gap-2">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handleChangePage("prev")}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            <ChevronLeft />
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handleChangePage("next")}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Product;
