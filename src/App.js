import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProductPage from "./components/ProductPage/ProductPage";
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
      </Routes>
    </div>
  );
}

export default App;
