import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";
import { cartActions } from "../../redux/slices/cart";
import CartItemsList from "./CartItemsList";

class CartPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const changeAmount = (e) => {
      const id = e.currentTarget.dataset.id;
      const index = e.currentTarget.dataset.index;
      const action = e.currentTarget.dataset.action;

      let item = this.props.cart.items[index];

      if (item.amount == 1 && action === "-") {
        this.props.dispatch(cartActions.removeItem(item));
        return;
      }
      let updatedItem = { ...item };

      action === "+" ? updatedItem.amount++ : updatedItem.amount--;

      const payload = {
        oldItem: item,
        newItem: updatedItem,
      };
      this.props.dispatch(cartActions.editItem(payload));
    };

    return (
      <div className="cart-page">
        <h2>Cart</h2>

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
                {this.props.cart.currentCurrency}{" "}
                {((this.props.cart.totalAmount * 21) / 100).toFixed(2)}
              </p>
              <p>{this.props.cart.itemsAmount}</p>
              <p>
                {this.props.cart.currentCurrency}{" "}
                {(
                  this.props.cart.totalAmount +
                  (this.props.cart.totalAmount * 21) / 100
                ).toFixed(2)}
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
