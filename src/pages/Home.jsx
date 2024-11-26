import Navbar from "../components/Navbar";
import Profil from "../components/Home/Profil";
import AboutUs from "../components/Home/AboutUs";
import Product from "../components/Home/product";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div>
      <div className="h-screen bg-cover bg-left"
      style={{backgroundImage: 'url("bg.jpg")' }}>
        <Navbar />
        <h1 className=" text-white font-bold  justify-center text-center text-2xl md:text-7xl w-3/6 mx-auto py-80">Welcome to <br/>PT. GHONIYYUN PUTRA</h1>
      
      </div>
      <div className=" bg-white bg-cover bg-no-repeat"
      style={{backgroundImage: 'url("bg-white.jpg")' }}>
        <Profil />
      </div>
      <div className="h-fit">
        <AboutUs />
        <div style={{backgroundImage: 'url("bg-product.jpg")' }}>
        <Product />
        </div>
      </div>
      <Footer />

    </div>
  );
}
