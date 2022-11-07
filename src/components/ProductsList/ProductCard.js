import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: null,
  };

  render() {
    const product = this.props.product;

    const navigateHandler = () => {
      this.setState({ navigate: true });
    };

    return (
      <>
        {this.state.navigate && <Navigate to={`/product/${product.id}`} />}
        <div className="product-wrapper" onClick={navigateHandler}>
          <div className={`product-card ${!product.inStock && "disabled"}`}>
            <div className="image-wrapper">
              <img src={product.gallery[0]} alt="" />
            </div>
            <p className="product-title">{product.name}</p>
            <ProductPrice prices={product.prices} />
          </div>
        </div>
      </>
    );
  }
}

export default connect()(ProductCard);
