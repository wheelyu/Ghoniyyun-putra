import React, { useState, useEffect } from 'react';
import { getCategories, updatePosts, getPostsbyId } from "../../services/api";
import Swal from 'sweetalert2';
const EditProductModal = ({ id }) => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [productData, setProductData] = useState({
    });
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await getPostsbyId(id);
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [id]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProductData((prev) => ({ ...prev, image: file }));
        validateField("image", file);
    };
    const validateField = (fieldName, value) => {
        let error = "";

        switch (fieldName) {
            case "name":
                if (!value.trim()) error = "Nama produk tidak boleh kosong.";
                break;
            case "price":
                if (!value) error = "Harga produk tidak boleh kosong.";
                break;
            case "description":
                if (!value.trim()) error = "Deskripsi tidak boleh kosong.";
                break;
            case "category_id":
                if (!value) error = "Pilih salah satu kategori.";
                break;
            case "image":
                if (!value) error = "Unggah gambar produk.";
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!productData.name.trim()) newErrors.name = "Nama produk tidak boleh kosong.";
        if (!productData.description.trim()) newErrors.description = "Deskripsi tidak boleh kosong.";
        if (!productData.price) newErrors.price = "Harga produk tidak boleh kosong.";
        if (!productData.category_id) newErrors.category_id = "Pilih salah satu kategori.";
        if (!productData.image) newErrors.image = "Unggah gambar produk.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append("name", productData.name);
                formData.append("description", productData.description);
                formData.append("price", productData.price);
                formData.append("stock", productData.stock);
                formData.append("category_id", productData.category_id);
                formData.append("image", productData.image);
                
                await updatePosts(id, formData);
                
                // SweetAlert success notification with page reload
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added Successfully!',
                    text: `${productData.name} has been edited.`,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(); // Reload the page when OK is clicked
                    }
                });
                
                setIsModalOpen(false);
                setProductData({
                    name: "",
                    description: "",
                    category_id: "",
                    image: null,
                    isActive: false,
                });
                setErrors({});
            } catch (error) {
                // SweetAlert error notification
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while Editing the product!',
                    confirmButtonText: 'Try Again'
                });
            }
        }
    };

    return (
        <div>
        {/* Modal Trigger Button */}
        <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Edit
        </button>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 mt-16">
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <form  className="p-6">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Nama Produk</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium mb-2">Deskripsi</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Masukkan deskripsi produk"
                                    rows="3"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium mb-2">Harga</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Masukkan harga produk"
                                    required
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stock" className="block text-sm font-medium mb-2">Stok</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={productData.stock}
                                    onChange={handleInputChange}
                                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${errors.stock ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Masukkan stok produk"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category_id" className="block text-sm font-medium mb-2">Kategori</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={productData.category_id}
                                    onChange={handleInputChange}
                                    className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${errors.category_id ? 'border-red-500' : 'border-gray-200'}`}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium mb-2">Gambar Produk</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageUpload}
                                    className={`block w-full border shadow-sm rounded-lg text-sm focus:ring-blue-500 ${errors.image ? 'border-red-500' : 'border-gray-200'}`}
                                    accept="image/*"
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>
                            {productData.image && (
                                <div className="mb-4">
                                    <img src={`http://localhost:5000/uploads/products/${productData.image}`} alt="Product" className="w-32 h-20 object-top object-cover rounded-lg" />
                                </div>
                            )}

                            <div className="flex justify-end gap-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleFormSubmit}
                                    type="submit"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default EditProductModal;