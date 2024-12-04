import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Contact from "./pages/ContactUs";
import About from "./pages/AboutUs";
import StickyCtaButton from "./components/stickyCtaButton";
function App() {
  const phoneNumber = "6285175174984"; // Ganti dengan nomor WhatsApp Anda, pastikan menggunakan format internasional
  const message = "Halo! Saya ingin bertanya tentang..."; // Pesan default yang akan dikirim

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // Membuka WhatsApp di tab baru
  };
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <StickyCtaButton onClick={handleClick}/> 
    </Router>
  );
}

export default App;
