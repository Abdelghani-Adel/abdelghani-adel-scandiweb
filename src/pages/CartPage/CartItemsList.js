import React, { Component } from "react";
import CartItem from "./CartItem";

class CartItemsList extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className="cart-items-list">
        {items.map((item) => (
          <CartItem key={Math.random()} item={item} />
        ))}
      </div>
    );
  }
}

export default CartItemsList;
