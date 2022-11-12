import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryName from "../components/CategoryName/CategoryName";
import ProductsList from "../components/ProductsList/ProductsList";
import { fetchProducts, productsActions } from "../redux/slices/productsSlice";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFilter: "all",
      products: this.props.products,
    };
  }

  changeFilter = (newFilter) => {
    const newProducts = this.state.products.filter(
      (product) => product.category === newFilter
    );

    this.props.dispatch(fetchProducts(newFilter));
  };

  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    return (
      <div>
        <CategoryName changeFilter={this.changeFilter} />
        <ProductsList
          products={this.props.products}
          productsFilter={this.state.productsFilter}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(AllProducts);
