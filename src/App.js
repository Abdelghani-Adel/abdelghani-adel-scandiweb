import { Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.css";
import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage/CartPage";
import ClothesProducts from "./pages/ClothesProducts";
import ProductPage from "./pages/ProductPage/ProductPage";
import TechProducts from "./pages/TechProducts";

import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "./redux/slices/cart";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(cartActions.getCartFromLocalstorage());
  }

  render() {
    return (
      <div className="container">
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
}

export default connect()(App);
