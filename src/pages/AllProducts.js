import React, { Component } from "react";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ProductsList from "../components/ProductsList/ProductsList";
import { LoadProducts } from "../graphql/Queries";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchProducts = async (productsFilter = "all") => {
    const products = await LoadProducts(productsFilter);

    this.setState({
      products: products,
    });
  };

  changeFilter = (newFilter) => {
    this.fetchProducts(newFilter);
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <>
        {this.state.products && (
          <div>
            <CategoryFilter changeFilter={this.changeFilter} />
            <ProductsList products={this.state.products} />
          </div>
        )}
      </>
    );
  }
}

export default AllProducts;
