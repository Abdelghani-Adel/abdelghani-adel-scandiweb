import React, { Component } from "react";
import { connect } from "react-redux";
import CartItemsList from "./CartItemsList";

class CartPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const currentCurrency = this.props.cart.currentCurrency;
    const itemsAmount = this.props.cart.itemsAmount;
    const totalAmount = this.props.cart.totalAmount;
    const tax = (this.props.cart.totalAmount * 21) / 100;

    return (
      <div className="cart-page">
        <h2 className="page-title">Cart</h2>

        <CartItemsList items={this.props.cart.items} />

        <div className="checkout">
          <div className="checkout-info">
            <div className="left">
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <p>Total: </p>
            </div>
            <div className="right">
              <p>
                {currentCurrency} {tax.toFixed(2)}
              </p>
              <p>{itemsAmount}</p>
              <p>
                {currentCurrency} {(totalAmount + tax).toFixed(2)}
              </p>
            </div>
          </div>
          <button className="order-btn">order</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartPage);
