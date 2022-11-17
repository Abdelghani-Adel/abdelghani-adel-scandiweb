import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";
import { cartActions } from "../../redux/slices/cart";

class CartItem extends Component {
  state = {
    viewedPic: 0, // Controlling displaying arrows on the thumbnail pic
  };

  render() {
    const { item } = this.props;
    const currency = item.price.currency.symbol;
    const price = item.price.amount;

    const changeAmount = (e) => {
      // Getting the action from data set on the html element - or +
      const action = e.currentTarget.dataset.action;

      // Remove the item from the cart if the amount = 1 and the action is -
      if (item.amount === 1 && action === "-") {
        this.props.dispatch(cartActions.removeItem(item));
        return;
      }

      // Making a copy from the item to be edited and dispatched to the cart
      let updatedItem = { ...item };

      // Deciding the action to be performed
      action === "+" ? updatedItem.amount++ : updatedItem.amount--;

      // Dispatching
      this.props.dispatch(cartActions.editItem(updatedItem));
    };

    // Change image handlers
    const showNextPic = () => {
      const length = item.gallery.length;
      // start over if the current pic is the last one
      if (this.state.viewedPic === length - 1) {
        this.setState({ viewedPic: 0 });
        return;
      }
      this.setState({ viewedPic: this.state.viewedPic + 1 });
    };
    const showPrevPic = () => {
      const length = item.gallery.length;
      // start from the end of the list if the current image is the first one
      if (this.state.viewedPic === 0) {
        this.setState({ viewedPic: length - 1 });
        return;
      }
      this.setState({ viewedPic: this.state.viewedPic - 1 });
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
            <img src={item.gallery[this.state.viewedPic]} alt="Product Image" />
            {item.gallery.length > 1 && (
              <div className="arrows">
                <span className="left-arrow" onClick={showPrevPic}>{`<`}</span>
                <span className="right-arrow" onClick={showNextPic}>{`>`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CartItem);
