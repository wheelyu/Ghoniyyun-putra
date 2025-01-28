import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { supabase } from "../../services/supabaseConfig";
import DataTable from "react-data-table-component"; // Import library data table
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AddPartnershipModal from "../../components/Admin/Partnership/add";
import EditPartnershipModal from "../../components/Admin/Partnership/edit";
import Swal from "sweetalert2";
import { Toast } from "../../components/alert/toast";
const Partnership = () => {
    const [partnership, setPartnership] = useState([]);
    const [filteredPartnership, setFilteredPartnership] = useState([]);
    const [search, setSearch] = useState(""); // State untuk pencarian\
    const [loading, setLoading] = useState(true);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [editID, setEditID] = useState(null);

    useEffect(() => {
            getPartnership();
        }, []);
        useEffect(() => {
                // Filter data berdasarkan pencarian
                const filtered = partnership.filter(
                    (row) =>
                        row.name.toLowerCase().includes(search.toLowerCase()) 
                );
                setFilteredPartnership(filtered);
            }, [search, partnership]);
        const getPartnership = async () => {
            setLoading(true);
            try {
                const { data, error, status } = await supabase
                .from('partnership')
                .select('*')
                if (error && status !== 406) {
                    throw error
                }
                if (data) {
                    setPartnership(data)
                    setFilteredPartnership(data)
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
                name: "Image",
                selector: (row) => (
                    <img
                        src={row.image_url}
                        alt={row.name}
                        className="w-40 h-24 object-center object-contain  rounded"
                    />
                ),
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
                    const { error } = await supabase.from("partnership").delete().eq("id", id);
                    if (error) {
                    Toast.fire({
                        icon: "error",
                        title: error.message,
                    })
                    } else {
                    
                    Toast.fire({
                        icon: "success",
                        title: "Deleted successfully",
                    });
                    }   
                    getPartnership();
                }
                })
                }
                catch (error) {
                console.log(error);
                }
            
            }

    return <div className="flex min-h-screen">
        <Sidebar active="Partnership" />
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
                        <h1 className="text-sm font-bold ">Partnership</h1>
                    </div>
                    <div className=" flex mb-4 gap-1">
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2  w-full"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="w-[150px] bg-green-500 text-white p-2  rounded hover:bg-green-600" onClick={() => setModalAdd(true)}>
                            Add Partnership
                    </button>
                    </div>
                    <DataTable
                        title="List Partner"
                        columns={columns}
                        data={filteredPartnership}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        selectableRows
                        responsive
                        
                    />
                    {/* Modal Add */}
                    {modalAdd && (
                        <AddPartnershipModal
                            onClose={() => setModalAdd(false)}
                            onPartnershipAdded={getPartnership}
                        />
                    )}
                    {/* Modal Edit */}
                    {modalEdit && (
                        <EditPartnershipModal
                            onClose={() => setModalEdit(false)}
                            onPartnershipEdit={getPartnership}
                            editID={editID}
                        />
                    )}
        </main>
        </div>
    </div>
}

export default Partnership;