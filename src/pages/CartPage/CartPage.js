import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../redux/slices/cart";
import ItemAttributes from "./ItemAttributes";

class CartPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const changeAmount = (e) => {
      const id = e.currentTarget.dataset.id;
      const action = e.currentTarget.dataset.action;

      let item = this.props.cart.items.find((item) => item.id === id);

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

        {this.props.cart.items.map((item) => (
          <div className="cart-item" key={Math.random()}>
            <div>
              <p className="item-brand">{item.brand}</p>
              <p className="item-name">{item.name}</p>
              <p className="item-price">
                {item.price.currency.symbol}
                {item.price.amount}
              </p>

              <ItemAttributes item={item} />
            </div>

            <div>
              <div className="amount-picture">
                <span className="plus-minus">
                  <button
                    className="plus"
                    data-id={item.id}
                    data-action="+"
                    onClick={changeAmount}
                  >
                    +
                  </button>
                  <span className="amount">{item.amount}</span>
                  <button
                    className="minus"
                    data-id={item.id}
                    data-action="-"
                    onClick={changeAmount}
                  >
                    -
                  </button>
                </span>
                <div className="product-picture">
                  <img src={item.gallery[0]} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="checkout">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartPage);
