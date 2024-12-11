import React, { useRef } from "react";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import Founder from "../components/Home/Founder";
import Story from "../components/AboutUs/story";
import Partnership from "../components/Home/Partnership";
import StickyCtaButton from "../components/stickyCtaButton";
import ContactForm from "../components/Contact/ContactForm";
export default function Home() {
  const section1Ref = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <Hero/>
      <Profil scrollToSection={scrollToSection} contactRef={contactRef}/>
      <AboutUs />
      <Partnership />
      <Product />
      <Founder />
      <Story />
      <div >
      
      <ContactForm ref={contactRef} /> 
      </div>
      <Footer />
      <StickyCtaButton />
    </div>
  );
}
