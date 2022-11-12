import React, { Component } from "react";
import CartItem from "./CartItem";

class CartItemsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    return (
      <div className="cart-items-list">
        {items.map((item, index) => (
          <CartItem
            key={Math.random()}
            item={item}
            index={index}
            items={items}
          />
        ))}
      </div>
    );
  }
}

export default CartItemsList;
