import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getPosts, getCategories } from '../../services/api';

const ProductPage = () => {
  // State untuk produk dan kategori
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State untuk kata kunci pencarian
  const [sortOrder, setSortOrder] = useState(""); // State untuk sorting
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Ambil data produk dan kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categories] = await Promise.all([getPosts(), getCategories()]);
        console.log(products);
        setProductData(products.data);
        setCategories(categories.data);
        setFilteredProducts(products.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  // Filter produk berdasarkan kategori, pencarian, dan urutan
  const handleCategorySubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    let filtered = [...productData];

    // Filter berdasarkan kategori
    if (selectedCategory) {
      const selectedCategoryId = parseInt(selectedCategory, 10);
      filtered = filtered.filter(product => product.category_id === selectedCategoryId);
    }

    // Filter berdasarkan kata kunci pencarian
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting berdasarkan harga
    if (sortOrder) {
      if (sortOrder === "low-to-high") {
          filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "high-to-low") {
          filtered.sort((a, b) => b.price - a.price);
      } else if (sortOrder === "a-to-z") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "z-to-a") {
          filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortOrder === "newest") {
          filtered.sort((a, b) => new Date(b.update_at) - new Date(a.update_at));
      } else if (sortOrder === "oldest") {
          filtered.sort((a, b) => new Date(a.update_at) - new Date(b.update_at));
      }
  }

    setFilteredProducts(filtered); // Update produk yang ditampilkan
  };

  return (
    <div>
      <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 md:w-[1500px] w-[390px] ml-3 md:mx-auto">
        <form action="" className="flex md:flex-row flex-col items-center justify-center">
          <div className="w-[353px]">
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

          <div className="w-[353px] ml-10">
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
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
              <option value="a-to-z">A-Z</option>
              <option value="z-to-a">Z-A</option>
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
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
      {loading ? (
    
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    
  ) : (
    <div className='w-[1500px] mx-auto'>
      <h1 className='text-2xl py-10'>Menampilkan {filteredProducts.length} dari {productData.length} produk</h1>
    <div className="flex flex-col md:flex-row min-h-fit md:min-h-screen p-4 md:p-10 bg-white]">
        
        <div className="flex-1 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-[#fafafa] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:cursor-pointer hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/products/${product.image}`}
                    alt={product.name}
                    className="w-full h-32 md:h-48 object-cover"
                  />
                </div>

                <div className="p-2 md:p-4">
                  <div className="flex justify-between items-center mb-1 md:mb-2">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
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
    )
  }
      
    </div>
  );
};

export default ProductPage;
