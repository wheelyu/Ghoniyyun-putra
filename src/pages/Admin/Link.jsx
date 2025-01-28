import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import Swal from "sweetalert2";
import { Toast } from "../../components/alert/toast";
import EditLinkModal from "../../components/Admin/Link/edit";
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    
    useEffect(() => {
        getLink();
    }, []);

    const getLink = async () => {
        try {
            setLoading(true);
            const { data: link, error } = await supabase
                .from("link")
                .select("*");
            if (error) {
                throw error;
            }
            setLink(link);
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
            name: "Link",
            selector: (row) => row.link,
            sortable: true,
            cell: (row) => (
                <a 
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                    {row.link}
                </a>
            ),
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
                </div>
            ),
        },
    ]
    const handleEdit = (row) => {
        setEditID(row.id);
        setModalEdit(true);
    };
        
    return (
        <div className="flex min-h-screen">
            <Sidebar active="Link" />
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
                        <h1 className="text-sm font-bold ">Link</h1>
                    </div>
                    
                    <DataTable
                        title="List Link"
                        columns={columns}
                        data={link}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                    />
                    {/* Modal Edit */}
                    {modalEdit && (
                        <EditLinkModal
                            onClose={() => setModalEdit(false)}
                            onLinkAdd={getLink}
                            editID={editID}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
