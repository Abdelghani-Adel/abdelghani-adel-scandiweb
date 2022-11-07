import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryName from "../components/CategoryName/CategoryName";
import ProductsList from "../components/ProductsList/ProductsList";
import { fetchProducts } from "../redux/slices/productsSlice";

class WomenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsFilter: "all",
      products: this.props.products,
    };
  }

  changeFilter = (newFilter) => {
    this.setState({ productsFilter: newFilter });
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

export default connect(mapStateToProps)(WomenPage);
