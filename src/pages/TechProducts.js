import React, { Component } from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import { LoadProducts } from "../graphql/Queries";

class TechProducts extends Component {
  constructor(props) {
    super(props);
  }

  state = { products: [] };

  componentDidMount() {
    const fetchapi = async () => {
      const products = await LoadProducts("tech");

      this.setState({
        ...this.state,
        products: products,
      });
    };

    fetchapi();
  }

  render() {
    return (
      <div>
        <p className="category-name">Tech</p>
        <ProductsList products={this.state.products} />
      </div>
    );
  }
}

export default TechProducts;
