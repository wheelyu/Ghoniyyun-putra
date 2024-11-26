import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
// Product data with categories
const productData = {
    contractor: [
        { 
            id: 1, 
            name: 'Rotari Swivale', 
            price: "80.000", 
            image: 'swivel.png', 
            rating: 4.5,
            description: 'Swivale berputar'
        },
        { 
            id: 2, 
            name: 'Shut-Off Valve', 
            price: '467.500', 
            image: 'swivel2.png', 
            rating: 4.2,
            description: 'Swivale Yang diam'
        },
        { 
            id: 3, 
            name: 'Swevel 3/4 (BEBEK)', 
            price: '120.000', 
            image: 'swivel3.png', 
            rating: 4.7,
            description: 'Swivale 3/4 seperti bebek kwek kwek'
        },
        { 
            id: 4, 
            name: 'Switch Hub', 
            price: '5.500.000', 
            image: 'swivel4.png', 
            rating: 4.7,
            description: 'Switch hub untuk pemasangan swivale'
        }
    ],
    tradingwholesaler: [
        { 
            id: 5, 
            name: 'X-Printer 420B USB + Bluetooth ', 
            price: 1155000, 
            image: 'Printer.png', 
            rating: 4.3,
            description: 'printer ini bisa pakai blutut'
        },
        { 
            id: 6, 
            name: 'Nozzle OPW Ori', 
            price: '590.000', 
            image: 'bensin.png', 
            rating: 4.6,
            description: 'kepala untuk isi bensin'
        },
        { 
            id: 7, 
            name: 'Selang Tex 4M', 
            price: '275.000', 
            image: 'selang.png', 
            rating: 4.4,
            description: 'Selang cuy'
        },
        { 
            id: 11, 
            name: 'ATG SS 160 + WindBEEL Smart Console ', 
            price: '17.500.000', 
            image: 'atg.png', 
            rating: 4.4,
            description: 'mahal betul jir'
        }
    ],
    operator: [
        { 
            id: 8, 
            name: 'Seragam Operator SPBU', 
            price: '150.000', 
            image: 'seragam.png', 
            rating: 4.5,
            description: 'Seragam operator spbu'
        },
        { 
            id: 9, 
            name: 'Rompi Control Petugas Pertamina', 
            price: '150.000', 
            image: 'rompi.png', 
            rating: 4.3,
            description: 'Rompi control petugas pertamina terkuat di bumi'
        },
        { 
            id: 10, 
            name: 'Topi', 
            price: '25.000', 
            image: 'topi.png', 
            rating: 4.6,
            description: 'Topi geming'
        }
    ]
};


const ProductPage = () => {
    // State to manage selected category and mobile menu
    const [selectedCategory, setSelectedCategory] = useState('contractor');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Categories for sidebar
    const categories = Object.keys(productData);

    // Mobile-friendly category selector
    const MobileCategorySelector = () => (
        <div className="md:hidden mb-4 relative">
            <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex justify-between items-center"
            >
                <span className="capitalize">
                    {selectedCategory} Products
                </span>
                <FontAwesomeIcon icon={faFilter} />
            </button>
        </div>
    );

    // Sidebar Component (used for both mobile and desktop)
    const CategorySidebar = ({ mobile = false }) => (
        <div className={`
            ${mobile 
                ? `fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
                    isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }` 
                : 'hidden md:block w-64 bg-white p-6 shadow-md rounded-xl'
            }
        `}>
            {mobile && (
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                    <button 
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="text-gray-600"
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-2xl" />
                    </button>
                </div>
            )}
            <h1 className=" hidden md:flex text-2xl font-bold mb-4 text-gray-800">Categories</h1>
            <ul className={`${mobile ? 'p-4' : ''} space-y-2`}>
                {categories.map((category) => (
                    <li 
                        key={category}
                        className={`
                            cursor-pointer 
                            px-4 py-2 
                            rounded-lg 
                            transition duration-300 
                            ${selectedCategory === category 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-blue-100 text-gray-700'}
                        `}
                        onClick={() => {
                            setSelectedCategory(category);
                            setIsMobileSidebarOpen(false);
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-fit md:min-h-screen p-4 md:p-10">
            {/* Desktop Sidebar */}
            <CategorySidebar />

            {/* Mobile Category Selector */}
            <MobileCategorySelector />

            {/* Mobile Sidebar Overlay */}
            <CategorySidebar mobile={true} />

            {/* Main Content */}
            <div className="flex-1 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 capitalize hidden md:block">
                    {selectedCategory} Products
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {productData[selectedCategory].map((product) => (
                        <div 
                            key={product.id} 
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
                                        Rp{product.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;