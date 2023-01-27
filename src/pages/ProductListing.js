import React, { Component } from "react";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ProductsList from "../components/ProductsList/ProductsList";
import { LoadProducts, LoadCategories } from "../graphql/Queries";

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  fetchProducts = async (productsFilter) => {
    const products = await LoadProducts(productsFilter);

    this.setState({
      products: products,
    });
  };

  changeFilter = (newFilter) => {
    this.fetchProducts(newFilter);
  };

  componentDidMount() {
    const fetchAPI = async () => {
      const categories = await LoadCategories();
      this.fetchProducts(categories[0].name);
    };

    fetchAPI();
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

export default ProductListing;
