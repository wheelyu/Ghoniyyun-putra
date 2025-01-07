import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/Product/ProductList";
import Bg from "../assets/bg.webp";
export default function Product() {
  return (
    <div className="">
        <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Darkness Overlay */}
          <div className="absolute inset-0 overflow-hidden">
              <img 
                  src={Bg}
                  alt="Background" 
                  className="w-full h-full   object-cover object-bottom absolute brightness-50 contrast-75 " 
              />
              {/* Tambahan overlay gelap */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          {/* Navbar */}
          <Navbar active="Product"/>
          
      </div>
        <div className="border-t-primary border-t-[10px]">
        <h1 className="  text-black font-bold  justify-center text-[40px] w-[1500px] py-10 mx-auto">Our Product</h1>
        <div className="px-2 md:px-20 h-fit ">
          <ProductList />
        </div>
        </div>
      <Footer />
    </div>
  );
}
