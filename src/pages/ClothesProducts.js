import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsList from "../components/ProductsList/ProductsList";

import { fetchCategory } from "../helper/fetchAPI";

class ClothesProducts extends Component {
  constructor(props) {
    super(props);
  }

  state = { products: [] };

  componentDidMount() {
    const fetchapi = async () => {
      const { products, categoryName } = await fetchCategory("clothes");

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
            <h3>{this.state.categoryName}</h3>
            <ProductsList products={this.state.products} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ClothesProducts);
