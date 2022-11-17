import React, { Component } from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import { LoadProducts } from "../graphql/Queries";

class ClothesProducts extends Component {
  constructor(props) {
    super(props);
  }

  state = { products: [] };

  componentDidMount() {
    const fetchapi = async () => {
      const products = await LoadProducts("clothes");

      this.setState({
        ...this.state,
        products: products,
      });
    };

    fetchapi();
  }

  render() {
    return (
      <>
        {this.state.products && (
          <div>
            <p className="category-name">Clothes</p>
            <ProductsList products={this.state.products} />
          </div>
        )}
      </>
    );
  }
}

export default ClothesProducts;
