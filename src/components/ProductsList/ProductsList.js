import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ProductsList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
