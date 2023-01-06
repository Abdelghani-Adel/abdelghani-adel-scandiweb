import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage/CartPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import "./styles/index.css";
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
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default connect()(App);
