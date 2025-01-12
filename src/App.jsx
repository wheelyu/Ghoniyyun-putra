import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/Admin/dashboard";
import ProductAdmin from "./pages/Admin/Product";
import CategoryAdmin from "./pages/Admin/Category";
import Client from "./pages/Admin/Client";
import Partnership from "./pages/Admin/Partnership";
import Topic from "./pages/Admin/Topic";
function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route element={<AdminRoute redirectPath="/admin/dashboard"/>}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<ProductAdmin />} />
          <Route path="/admin/category" element={<CategoryAdmin />} />
          <Route path="/admin/client" element={<Client />} />
          <Route path="/admin/partnership" element={<Partnership />} />
          <Route path="/admin/topic" element={<Topic />} />
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;
