import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <div className="App container">
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/women" replace />} />
        <Route path="/all" element={<AllProducts />} />
        <Route path="/clothes" element={<h2>Clothes</h2>} />
        <Route path="/tech" element={<h2>Tech</h2>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
