import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Contact from "./pages/ContactUs";
import About from "./pages/AboutUs";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/Admin/dashboard";
import ProductAdmin from "./pages/Admin/Product";
import CategoryAdmin from "./pages/Admin/Category";
function App() {
  const phoneNumber = "6285175174984"; // Ganti dengan nomor WhatsApp Anda, pastikan menggunakan format internasional
  const message = "Halo! Saya ingin bertanya tentang..."; // Pesan default yang akan dikirim

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // Membuka WhatsApp di tab baru
  };
  const path = window.location.pathname;
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route element={<AdminRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/produk" element={<ProductAdmin />} />
          <Route path="/admin/kategori" element={<CategoryAdmin />} />
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;
