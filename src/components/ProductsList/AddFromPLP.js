import React, { Component } from "react";
import cartIcon from "../../assets/cartWhite.png";

class AddFromPLP extends Component {
  render() {
    const { addToCartHandler } = this.props;

    return (
      <span className="green-cart-icon" onClick={addToCartHandler}>
        <img src={cartIcon} alt="Cart Icon" />
      </span>
    );
  }
}

export default AddFromPLP;
