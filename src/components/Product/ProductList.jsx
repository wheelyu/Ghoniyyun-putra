import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseConfig';
import ProductDetail from './ProductDetail';
import { formatIDR } from "../../hooks/useFormatIDR";
import useCategoryStore from '../../stores/useCategoryStore';
import ProductDetailModal from "./ProductDetailModal";  
const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = useCategoryStore(state => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(state => state.setSelectedCategory);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');
  const openModal = ( id ) => {
    setId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Fetch initial data
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  // Apply filters whenever productData, searchQuery, or selectedCategory changes
  useEffect(() => {
    if (productData.length > 0) {
      filterProducts();
    }
  }, [productData, searchQuery, selectedCategory]);

  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('is_active', true);

      if (error) {
        console.error('Failed to fetch categories:', error);
        return;
      }
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data: products, error } = await supabase
        .from("product")
        .select(`
          *,
          category:category_id (
            id,
            name
          )
        `);

      if (error) {
        console.error(error);
        return;
      }

      const transformedProducts = products.map(product => ({
        ...product,
        category_name: product.category?.name || 'Uncategorized'
      }));

      setProductData(transformedProducts);
      // Don't set filteredProducts here anymore as it will be handled by the useEffect
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...productData]; // Create a new array to avoid mutation

    // Filter berdasarkan pencarian
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter berdasarkan kategori
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category_name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 md:w-[1500px] w-[390px]  md:mx-auto">
        <form action="" className="flex md:flex-row flex-col items-center justify-center">
          <div className="w-full">
            <label htmlFor="search" className="block text-base font-bold mb-2">
              Cari Produk
            </label>
            <input
              id="search"
              type="text"
              placeholder="Contoh : Rotari Swivale"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-3 px-4 block w-full text-[#1F2937] font-medium bg-white rounded-lg text-sm border outline-none placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm"
            />
          </div>

          <div className="w-full md:ml-10">
            <label htmlFor="category-select" className="block text-base font-bold mb-2">
              Kategori
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 px-4 block w-full rounded-lg text-sm border outline-none bg-white placeholder:text-[#6B7280] placeholder:font-semibold placeholder:text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className='md:w-[1500px] mx-auto '>
          <h1 className='text-2xl md:py-10 my-10'>Menampilkan {filteredProducts.length} dari {productData.length} produk</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-[#fafafa] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-56 md:h-72 object-cover"
                  />
                </div>
                <div className="p-2 md:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-xl font-bold text-blue-600">
                      {formatIDR(product.price)}
                    </span>
                    <button
                      onClick={() => openModal(product.id)}
                      className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                      View Details
                    </button>
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
      )}
      {isModalOpen && <ProductDetailModal id={id} closeModal={closeModal} />}
    </div>
  );
};

export default ProductPage;