import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage/CartPage";
import ClothesProducts from "./pages/ClothesProducts";
import ProductPage from "./pages/ProductPage/ProductPage";
import TechProducts from "./pages/TechProducts";

function App() {
  return (
    <div className="App container">
      <NavBar />

      <div className="content-area">
        <Routes>
          <Route path="/" element={<Navigate to="/all" replace />} />
          <Route path="/all" element={<AllProducts />} />
          <Route path="/clothes" element={<ClothesProducts />} />
          <Route path="/tech" element={<TechProducts />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
