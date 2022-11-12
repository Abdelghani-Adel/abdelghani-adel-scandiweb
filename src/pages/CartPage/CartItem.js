import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";
import { cartActions } from "../../redux/slices/cart";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    viewdPic: 0,
  };
  render() {
    const { item, index, items } = this.props;
    const currency = item.price.currency.symbol;
    const price = item.price.amount;

    const changeAmount = (e) => {
      const id = e.currentTarget.dataset.id;
      const index = e.currentTarget.dataset.index;
      const action = e.currentTarget.dataset.action;

      const item = items[index];

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
            <button
              className="plus"
              data-id={item.id}
              data-index={index}
              data-action="+"
              onClick={changeAmount}
            >
              +
            </button>
            <span className="amount">{item.amount}</span>
            <button
              className="minus"
              data-id={item.id}
              data-index={index}
              data-action="-"
              onClick={changeAmount}
            >
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
