import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/sidebar";
import Header from "../../components/Admin/Header";
import {getCategories} from "../../services/api";
import { formatWIBTime } from "../../hooks/useFormatTime";
const Category = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            const response = await getCategories();
            console.log(response.data);
            setCategory(response.data);
        };
        getCategory();
    }, []);
    return <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Kategori yang ada di website</h1>
                <div className="flex justify-end my-5">
                    <a href="/admin/kategori/tambah" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3  px-4 rounded">Tambah Kategori</a>
                </div>
                <table className="w-full table-auto bg-white">
                    <thead className="bg-primary">
                        <tr>
                            <th className="px-4 text-start py-2 border">No</th>
                            <th className="px-4 text-start py-2 border">Name</th>
                            <th className="px-4 text-start py-2 border">Description</th>
                            <th className="px-4 text-start py-2 border">Active</th>
                            <th className="px-4 text-start py-2 border">Updated At</th>
                            <th className="px-4 text-start py-2 border">Action</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {category.map((item, index) => (
                            <tr key={index}>
                                <td className=" px-4 py-2">{index + 1}</td>
                                <td className=" px-4 py-2">{item.name}</td>
                                <td className=" px-4 py-2">{item.description}</td>
                                <td className=" px-4 py-2">{item.is_active ? "Yes" : "No"}</td>
                                <td className=" px-4 py-2">{formatWIBTime(item.updated_at)}</td>
                                <td className=" px-4 py-2">
                                    <div className="flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    </div>
}

export default Category;