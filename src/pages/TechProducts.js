import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsList from "../components/ProductsList/ProductsList";
import { fetchCategory } from "../helper/fetchAPI";

class TechProducts extends Component {
  constructor(props) {
    super(props);
  }

  state = { products: [] };

  componentDidMount() {
    const fetchapi = async () => {
      const { products, categoryName } = await fetchCategory("tech");

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
      <div>
        <p className="category-name">{this.state.categoryName}</p>
        <ProductsList products={this.state.products} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(TechProducts);
