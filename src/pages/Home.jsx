import Navbar from "../components/Navbar";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Profil />
      <AboutUs />
      <Product />
      <Footer />

    </div>
  );
}
