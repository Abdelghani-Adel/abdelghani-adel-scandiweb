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
    const totalAmount = this.props.cart.totalAmount;
    const currency = this.props.cart.currentCurrency;

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
          <button onClick={this.props.closePortal} className="view-bag">
            <Link to="/cart">VIEW BAG</Link>
          </button>
          <button onClick={this.props.closePortal} className="checkout">
            Checkout
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
