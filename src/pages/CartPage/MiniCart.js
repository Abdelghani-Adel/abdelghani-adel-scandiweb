import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItemsList from "./CartItemsList";

class MiniCart extends Component {
  render() {
    const items = this.props.cart.items;
    const itemsAmount = this.props.cart.itemsAmount;
    // const tax = (this.props.cart.totalAmount * 21) / 100;
    const totalAmount = this.props.cart.totalAmount;
    const currency = this.props.cart.currentCurrency;
    const closePortal = this.props.closePortal;

    return (
      <div className="mini-cart">
        <p className="title">
          <span className="my-bag">My Bag : </span>
          <span>
            {itemsAmount} {itemsAmount > 1 ? "items" : "item"}
          </span>
        </p>

        <CartItemsList items={items} />

        <div className="total">
          <p>Total</p>
          <p>
            {currency}
            {totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="buttons">
          <Link to="/cart" className="view-bag" onClick={closePortal}>
            view bag
          </Link>

          <Link to="/cart" className="checkout" onClick={closePortal}>
            checkout
          </Link>

          {/* The functionality of the checkout button is not described in the figma file or in the FAQ page */}
          {/* So, I made it the same functionality of view bag button which will navigate the user to the cart page */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(MiniCart);
