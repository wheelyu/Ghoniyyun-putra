import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { 
    BoxIcon,
    ListCheckIcon,
    Users,
    Handshake
} from 'lucide-react';
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseConfig";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalClients, setTotalClients] = useState(0);
    const [totalPartnerships, setTotalPartnerships] = useState(0);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [{ count: productCount }, { count: categoryCount }, { count: clientCount }, { count: partnershipCount }] = await Promise.all([
                    supabase.from("product").select("id", { count: "exact", head: true }),
                    supabase.from("categories").select("id", { count: "exact", head: true }),
                    supabase.from("client").select("id", { count: "exact", head: true }),
                    supabase.from("partnership").select("id", { count: "exact", head: true }),
                ]);

                setTotalProducts(productCount || 0);
                setTotalCategories(categoryCount || 0);
                setTotalClients(clientCount || 0);
                setTotalPartnerships(partnershipCount || 0);
            } catch (error) {
                console.error("Error fetching data counts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTotals();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar active="Dashboard" />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard Admin</h1>
                    <small className="text-sm text-gray-400 ">Manage all things on your website</small>
                    <div className="flex flex-wrap gap-4 mt-5">
                        <Link to="/admin/product">
                            <div className="flex flex-col gap-1 hover:gap-7 transition-all duration-300 items-center justify-center bg-white p-4 w-[200px] h-[200px] cursor-pointer">
                                <BoxIcon size={70} color="#f87171" />
                                <h1 className="text-2xl">{loading ? "Loading..." : totalProducts}</h1>
                                <h1 className="text-sm text-gray-400">Product</h1>
                            </div>
                        </Link>
                        <Link to="/admin/category">
                            <div className="flex flex-col gap-1 hover:gap-7 transition-all duration-300 items-center justify-center bg-white p-4 w-[200px] h-[200px] cursor-pointer">
                                <ListCheckIcon size={70} color="#f87171" />
                                <h1 className="text-2xl">{loading ? "Loading..." : totalCategories}</h1>
                                <h1 className="text-sm text-gray-400">Categories</h1>
                            </div>
                        </Link>
                        <Link to="/admin/client">
                            <div className="flex flex-col gap-1 hover:gap-7 transition-all duration-300 items-center justify-center bg-white p-4 w-[200px] h-[200px] cursor-pointer">
                                <Users size={70} color="#f87171" />
                                <h1 className="text-2xl">{loading ? "Loading..." : totalClients}</h1>
                                <h1 className="text-sm text-gray-400">Client</h1>
                            </div>
                        </Link>
                        <Link to="/admin/partnership">
                            <div className="flex flex-col gap-1 hover:gap-7 transition-all duration-300 items-center justify-center bg-white p-4 w-[200px] h-[200px] cursor-pointer">
                                <Handshake size={70} color="#f87171" />
                                <h1 className="text-2xl">{loading ? "Loading..." : totalPartnerships}</h1>
                                <h1 className="text-sm text-gray-400">Partnership</h1>
                            </div>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
