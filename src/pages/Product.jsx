import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/Product/ProductList";
export default function Product() {
  return (
    <div className="">
      <div className="md:h-96 h-48 bg-cover  bg-bottom"
      style={{backgroundImage: 'url("bg.jpg")' }}>
        <Navbar />
        <h1 className="ml-96 pt-[200px] text-white font-bold  justify-center text-[40px] w-[851px]">Our Product</h1>
      
      </div>

      <div className="px-2 md:px-20 h-fit">
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}
