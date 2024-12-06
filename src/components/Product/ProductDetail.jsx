import React, { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";  // Assuming the modal is in a separate file

const ProductDetail = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        View Details
      </button>

      {isModalOpen && <ProductDetailModal id={id} closeModal={closeModal} />}
    </>
  );
};

export default ProductDetail;
