import React, { Component } from "react";
import ProductPrice from "./ProductPrice";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product;

    return (
      <div className="product-wrapper">
        <div className={`product-card ${!product.inStock && "disabled"}`}>
          <div className="image-wrapper">
            <img src={product.gallery[0]} alt="" />
          </div>
          <p className="product-title">{product.name}</p>
          <ProductPrice prices={product.prices} />
        </div>
      </div>
    );
  }
}

export default ProductCard;
