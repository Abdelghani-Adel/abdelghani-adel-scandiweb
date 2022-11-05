import React, { Component } from "react";
import CategoryName from "../components/CategoryName/CategoryName";
import ProductsList from "../components/ProductsList/ProductsList";

class WomenPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <CategoryName category="Women" />
        <ProductsList />
      </div>
    );
  }
}

export default WomenPage;
