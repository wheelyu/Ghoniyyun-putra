import React from "react";
import Sidebar from "../../components/Admin/sidebar";
import Header from "../../components/Admin/Header";
const Dashboard = () => {
    return <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Selamat Datang di Dasbor Admin</h1>
          {/* Isi konten utama akan ditambahkan di sini */}
        </main>
        </div>
    </div>
}

export default Dashboard;