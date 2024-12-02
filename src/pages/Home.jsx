import Navbar from "../components/Navbar";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import { motion, AnimatePresence } from 'framer-motion';
export default function Home() {
  return (
    <div>
        <Hero/>
        <Profil />
        <AboutUs />
      <div className="h-fit">
        <div style={{backgroundImage: 'url("bg-product.webp")' }}>
        <Product />
        </div>
      </div>
      <Footer />

    </div>
  );
}
