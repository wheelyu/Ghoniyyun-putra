import React, { useRef } from "react";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import Founder from "../components/Home/Founder";
import Story from "../components/AboutUs/story";
import Partnership from "../components/Home/Partnership";
import ContactForm from "../components/Home/ContactForm";
import Service from "../components/Home/Services";
import ProjectDigital from "../components/Home/ProjectDigital";
export default function Home() {

  return (
    <div>
      <Hero/>

      <Profil  />
      <section id="about-section" className="...">
        
        <AboutUs />
      </section>
      <Partnership />
      <Product />
      <section id="service-section" className="...">
      <div className="h-20"></div>
        <Service />
      </section>

      <ProjectDigital />
      <Founder />
      <Story />
      <section id="contact-section" className="...">
      <div className="h-20"></div>
        <ContactForm  /> 
      </section>

      <Footer />
    </div>
  );
}
