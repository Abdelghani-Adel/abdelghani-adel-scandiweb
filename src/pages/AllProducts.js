import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryName from "../components/CategoryName/CategoryName";
import ProductsList from "../components/ProductsList/ProductsList";
import { fetchCategory } from "../helper/fetchAPI";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFilter: "all",
    };
  }

  changeFilter = (newFilter) => {
    const fetchapi = async () => {
      const { products, categoryName } = await fetchCategory(newFilter);

      this.setState({
        ...this.state,
        products: products,
        categoryName: categoryName,
      });
    };

    fetchapi();
  };

  componentDidMount() {
    const fetchapi = async () => {
      const { products, categoryName } = await fetchCategory("all");

      this.setState({
        ...this.state,
        products: products,
        categoryName: categoryName,
      });
    };

    fetchapi();
  }

  render() {
    return (
      <>
        {this.state.products && (
          <div>
            <CategoryName changeFilter={this.changeFilter} />
            <ProductsList
              products={this.state.products}
              productsFilter={this.state.productsFilter}
            />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(AllProducts);
