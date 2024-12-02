import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
// Product data with categories
const productData = {
    Contractor: [
        { 
            id: 1, 
            name: 'Rotari Swivale', 
            price: 80000, 
            image: 'swivel.webp', 
            rating: 4.5,
            description: 'Swivale berputar'
        },
        { 
            id: 2, 
            name: 'Shut-Off Valve', 
            price: 467500, 
            image: 'swivel2.webp', 
            rating: 4.2,
            description: 'Swivale Yang diam'
        },
        { 
            id: 3, 
            name: 'Swevel 3/4 (BEBEK)', 
            price: 120000, 
            image: 'swivel3.webp', 
            rating: 4.7,
            description: 'Swivale 3/4 seperti bebek kwek kwek'
        },
        { 
            id: 4, 
            name: 'Switch Hub', 
            price: 5500000, 
            image: 'swivel4.webp', 
            rating: 4.7,
            description: 'Switch hub untuk pemasangan swivale'
        }
    ],
    tradingwholesaler: [
        { 
            id: 5, 
            name: 'X-Printer 420B USB + Bluetooth ', 
            price: 1155000, 
            image: 'Printer.webp', 
            rating: 4.3,
            description: 'printer ini bisa pakai blutut'
        },
        { 
            id: 6, 
            name: 'Nozzle OPW Ori', 
            price: 590000, 
            image: 'bensin.webp', 
            rating: 4.6,
            description: 'kepala untuk isi bensin'
        },
        { 
            id: 7, 
            name: 'Selang Tex 4M', 
            price: 275000, 
            image: 'selang.webp', 
            rating: 4.4,
            description: 'Selang cuy'
        },
        { 
            id: 11, 
            name: 'ATG SS 160 + WindBEEL Smart Console ', 
            price: 17500000, 
            image: 'atg.webp', 
            rating: 4.4,
            description: 'mahal betul jir'
        }
    ],
    operator: [
        { 
            id: 8, 
            name: 'Seragam Operator SPBU', 
            price: 150000, 
            image: 'seragam.webp', 
            rating: 4.5,
            description: 'Seragam operator spbu'
        },
        { 
            id: 9, 
            name: 'Rompi Control Petugas Pertamina', 
            price: 150000, 
            image: 'rompi.webp', 
            rating: 4.3,
            description: 'Rompi control petugas pertamina terkuat di bumi'
        },
        { 
            id: 10, 
            name: 'Topi', 
            price: 25000, 
            image: 'topi.webp', 
            rating: 4.6,
            description: 'Topi geming'
        }
    ]
};


const ProductPage = () => {
    // State to manage selected category and mobile menu
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk kata kunci pencarian
    const [sortOrder, setSortOrder] = useState(""); // State untuk sorting

    // Inisialisasi produk saat halaman pertama kali dimuat
    React.useEffect(() => {
        const allProducts = Object.values(productData).flat();
        setFilteredProducts(allProducts);
    }, []);

    const handleCategorySubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman
        
            // Filter berdasarkan kategori
            let filtered = selectedCategory
            ? productData[selectedCategory] || []
            : Object.values(productData).flat();
        
            // Filter berdasarkan kata kunci pencarian
            if (searchQuery.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            }
        
            // Sorting berdasarkan harga
            if (sortOrder === "low-to-high") {
            filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (sortOrder === "high-to-low") {
            filtered = filtered.sort((a, b) => b.price - a.price);
            }
        
            setFilteredProducts(filtered); // Update produk yang ditampilkan
        };
        
        
        

    return (
        <div>
        <div className=" bg-[#FAFAFA] border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 md:w-[1222px] w-[390px] ml-3  md:mx-auto ">
            <form action="" className="flex md:flex-row flex-col">
            <div className="w-[353px]">
                <label htmlFor="search" className="block text-base font-bold mb-2">
                    Cari Produk
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Cari Produk"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
                />
            </div>

            <div className="w-[353px] ml-10">
                <label htmlFor="category-select" className="block text-base font-bold mb-2">
                Kategori
                </label>
                <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // Simpan kategori sementara
                className="py-3 px-4 block w-full rounded-lg text-sm border outline-none bg-white placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
                >
                <option value="">Pilih Kategori</option>
                <option value="Contractor">Contractor</option>
                <option value="tradingwholesaler">Trading Wholesaler</option>
                <option value="operator">Operator</option>
                </select>
            </div>
            <div className="w-[353px] mx-0 md:mx-5 my-5 md:my-0">
            <label htmlFor="sort-select" className="block text-base font-bold mb-2">
                Urutkan
            </label>
            <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="py-3 px-4 block w-full rounded-lg text-sm border outline-none bg-white placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
            >
                <option value="">Pilih Urutan</option>
                <option value="low-to-high">Harga: Rendah ke Tinggi</option>
                <option value="high-to-low">Harga: Tinggi ke Rendah</option>
            </select>
            </div>
            <button
                type="submit"
                className="md:w-[45px] md:h-[45px] w-[353px] h-[52px] bg-red-400 rounded-lg flex items-center justify-center mt-8 mx-0 md:mx-5"
                onClick={handleCategorySubmit}
            >
                <FontAwesomeIcon icon={faSearch} className="text-white" />
            </button>
            </form>
        </div>

        <div className="flex flex-col md:flex-row min-h-fit md:min-h-screen p-4 md:p-10 w-[1222px] mx-auto">
            <div className="flex-1 md:p-10">
            

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden 
                            transform transition duration-300 
                            hover:cursor-pointer hover:shadow-xl"
            >
                {/* Product Image */}
                <div className="relative">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-32 md:h-48 object-cover"
                    />
                    <button 
                        className="absolute top-2 right-2 
                                    bg-white rounded-full p-1 md:p-2 
                                    shadow-md hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faHeart} className="text-xs md:text-base" />
                    </button>
                </div>

                {/* Product Details */}
                <div className="p-2 md:p-4">
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate">
                            {product.name}
                        </h3>
                        <div className="flex items-center text-yellow-500">
                            <FontAwesomeIcon icon={faStar} className="mr-1 text-xs md:text-base" />
                            <span className="text-xs md:text-sm">{product.rating}</span>
                        </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                        <span className="text-sm md:text-xl font-bold text-blue-600">
                            Rp{(product.price).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </div>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">
                            Tidak ada produk yang ditemukan.
                        </div>
                    )}
            </div>
            
        </div>
    </div>
    );
};

export default ProductPage;