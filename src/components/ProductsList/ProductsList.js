import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="products-list">
        {this.props.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
