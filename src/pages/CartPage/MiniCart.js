import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItemsList from "./CartItemsList";

class MiniCart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const items = this.props.cart.items;
    const itemsAmount = this.props.cart.itemsAmount;
    const tax = (this.props.cart.totalAmount * 21) / 100;
    const totalAmount = this.props.cart.totalAmount;
    const currency = this.props.cart.currentCurrency;
    const closePortal = this.props.closePortal;

    return (
      <div className="mini-cart">
        <p className="title">
          <span className="my-bag">My Bag : </span>
          <span>{itemsAmount} items</span>
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

          <button onClick={closePortal} className="checkout">
            checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(MiniCart);
