import React, { Component } from "react";
import cartIcon from "../../assets/cartWhite.png";

class AddFromPLP extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isShown, addToCartHandler } = this.props;

    return (
      <>
        {isShown && (
          <span className="green-cart-icon" onClick={addToCartHandler}>
            <img src={cartIcon} alt="Cart Icon" />
          </span>
        )}
      </>
    );
  }
}

export default AddFromPLP;
