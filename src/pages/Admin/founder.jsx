import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import Swal from "sweetalert2";
import { Toast } from "../../components/alert/toast";
import EditFounderModal from "../../components/Admin/Founder/edit";

const Founder = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    
    useEffect(() => {
        getFounder();
    }, []);

    const getFounder = async () => {
        try {
            setLoading(true);
            const { data: founder, error } = await supabase
                .from("founder")
                .select("*");
            if (error) {
                throw error;
            }
            setData(founder);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const columns = [
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
            name: "Quote",
            selector: (row) => row.quote,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
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
                        <h1 className="text-sm font-bold ">Founder</h1>
                    </div>
                    
                    <DataTable
                        title="List Founder"
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                    />


                    {/* Modal Edit */}
                    {modalEdit && (
                        <EditFounderModal
                            onClose={() => setModalEdit(false)}
                            onFounderAdd={getFounder}
                            editID={editID}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Founder;
