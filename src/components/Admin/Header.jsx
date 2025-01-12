import React, { useEffect, useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { supabase } from "../../services/supabaseConfig"; // Pastikan file konfigurasi Supabase benar

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser(); // Ambil data user dari Supabase Auth
            if (error) {
                console.error("Error fetching user:", error.message);
            } else {
                setUser(data.user); // Simpan data user di state
            }
        };

        fetchUser();
    }, []);

    return (
        <header className="bg-white shadow-md h-20 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4 font-bold text-2xl text-gray-400">
                Ghoniyyun Petrol Teknik
            </div>

            <div className="flex items-center space-x-4">
            

                <div className="flex items-center space-x-2">
                    <div>
                        <p className="text-sm font-semibold">{user?.user_metadata?.full_name || user?.email}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
