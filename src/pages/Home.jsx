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
import VisiMisi from "../components/Home/VisiMisi";
import ProjectDigital from "../components/Home/ProjectDigital";
export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Profil />
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
      {/* Story component dengan sticky positioning */}
      <div className="sticky top-0 z-10 h-screen flex flex-col justify-center">
        <VisiMisi />
      </div>
      
      {/* Contact form dan Footer dengan z-index lebih tinggi */}
      <div className="relative z-20 bg-white border-t-8 shadow-lg border-primary">
        <section id="contact-section" className="...">
          <div className="h-20"></div>
          <ContactForm />
        </section>
        <Footer />
      </div>
    </div>
  );
}