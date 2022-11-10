import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import WomenPage from "./pages/WomenPage";

function App() {
  return (
    <div className="App container">
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/women" replace />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/men" element={<h2>Men</h2>} />
        <Route path="/kids" element={<h2>Kids</h2>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
