import React, { useEffect, useState } from "react";
import { getPostsbyId } from "../../services/api";
const ProductDetailModal = ({ id, closeModal }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getPostsbyId(id);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full  p-10 rounded-lg "
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <img
          src={`http://localhost:5000/uploads/products/${product.image}`}
          alt={product.name}
          className="w-10 h-10 object-cover my-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <span className="text-lg font-bold text-blue-600">
          Rp{product.price}
        </span>
        <div className="mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
