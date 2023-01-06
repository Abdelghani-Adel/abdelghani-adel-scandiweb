import React, { Component } from "react";
import AddFromPLP from "./AddFromPLP";

class ProductImage extends Component {
  render() {
    const { image, addToCartHandler, addFromPLP } = this.props;
    return (
      <div className="product-image">
        <img src={image} alt="Product" />
        <AddFromPLP isShown={addFromPLP} addToCartHandler={addToCartHandler} />
      </div>
    );
  }
}

export default ProductImage;
