import React from "react";
import Contractor from "../../assets/contactor.webp";
import Bg from "../../assets/bg.webp";
import Pertamina from "../../assets/pertamina1.webp";
const OurProduct = () => {
    const products = [
        {
        id: 1,
        title: "Contractor",
        image: {Contractor}, // Ganti dengan URL gambar produk Anda
        },
        {
        id: 2,
        title: "Trading Wholesaler",
        image: {Bg}, // Ganti dengan URL gambar produk Anda
        },
        {
        id: 3,
        title: "Operator",
        image: {Pertamina}, // Ganti dengan URL gambar produk Anda
        },
    ];

    return (
        <div className="bg-white bg-opacity-90 mb-56 pt-20 px-4 md:px-48">
        <h1 className="text-4xl font-bold mb-12 text-primary">
            Our Products and services
        </h1>
        <div className="bg-white p-10 rounded-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {products.map((product, index) => (
                <a href={`/product/${product.id}`} key={`product-${product.id}-${index}`}>
                    <div
                        className="relative group overflow-hidden rounded-lg shadow-lg hover:cursor-pointer"
                    >
                        {/* Gambar Produk */}
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay dengan Judul */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <h2 className="text-white text-lg font-bold">{product.title}</h2>
                        </div>
                    </div>
                </a>
            ))}
            </div>
            <div className="flex justify-end">
            <a href='/product' className="border-primary hover:bg-primary hover:text-white border text-primary py-2 px-4 rounded mt-8  transition-all duration-300 ">See More Product</a>
            </div>
        </div>
        </div>
    );
};

export default OurProduct;
