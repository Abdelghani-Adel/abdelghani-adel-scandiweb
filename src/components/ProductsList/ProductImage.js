import React, { Component } from "react";
import AddFromPLP from "./AddFromPLP";

class ProductImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { image, addToCartHandler, addFromPLP } = this.props;
    return (
      <div className="product-image">
        <img src={image} alt="Product Image" />
        <AddFromPLP isShown={addFromPLP} addToCartHandler={addToCartHandler} />
      </div>
    );
  }
}

export default ProductImage;
