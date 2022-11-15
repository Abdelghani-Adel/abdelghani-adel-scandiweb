import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";
import { cartActions } from "../../redux/slices/cart";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    viewdPic: 0, // Controlling displaying arrows on the thumbnail pic
  };

  render() {
    const { item } = this.props;
    const currency = item.price.currency.symbol;
    const price = item.price.amount;

    const changeAmount = (e) => {
      // Getting the action from data set on the html element - or +
      const action = e.currentTarget.dataset.action;

      // Remove the item from the cart if the amount = 1 and the action is -
      if (item.amount == 1 && action === "-") {
        this.props.dispatch(cartActions.removeItem(item));
        return;
      }

      // Making a copy from the item to be edited and dispatched to the cart
      let updatedItem = { ...item };

      // Deciding the action to be performed
      action === "+" ? updatedItem.amount++ : updatedItem.amount--;

      const payload = {
        oldItem: item,
        newItem: updatedItem,
      };
      this.props.dispatch(cartActions.editItem(payload));
    };

    const nextPic = () => {
      const length = item.gallery.length;
      if (this.state.viewdPic === length - 1) {
        this.setState({ viewdPic: 0 });
        return;
      }
      this.setState({ viewdPic: this.state.viewdPic + 1 });
    };
    const prevPic = () => {
      const length = item.gallery.length;
      if (this.state.viewdPic === 0) {
        this.setState({ viewdPic: length - 1 });
        return;
      }
      this.setState({ viewdPic: this.state.viewdPic - 1 });
    };

    return (
      <div className="cart-item">
        <div className="item-info">
          <p className="item-brand">{item.brand}</p>
          <p className="item-name">{item.name}</p>
          <p className="item-price">
            {currency} {price}
          </p>
          <ProductAttributes
            attributes={item.attributes}
            attributesValues={item.attributesValues}
          />
        </div>

        <div className="amount-controls-wrapper">
          <span className="plus-minus">
            <button className="plus" data-action="+" onClick={changeAmount}>
              +
            </button>
            <span className="amount">{item.amount}</span>
            <button className="minus" data-action="-" onClick={changeAmount}>
              -
            </button>
          </span>
          <div className="cart-item--pic">
            <img src={item.gallery[this.state.viewdPic]} alt="" />
            {item.gallery.length > 1 && (
              <div className="arrows">
                <span className="left-arrow" onClick={prevPic}>{`<`}</span>
                <span className="right-arrow" onClick={nextPic}>{`>`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CartItem);
