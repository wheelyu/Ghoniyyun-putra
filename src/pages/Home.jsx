import React, { useRef } from "react";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import Founder from "../components/Home/Founder";
import Story from "../components/AboutUs/story";
import Partnership from "../components/Home/Partnership";
import ContactForm from "../components/Contact/ContactForm";
export default function Home() {

  return (
    <div>
      <Hero/>
      <Profil  />
      <AboutUs />
      <Partnership />
      <Product />
      <Founder />
      <Story />
      <div >
      
      <ContactForm  /> 
      </div>
      <Footer />
    </div>
  );
}
