import React, { Component } from "react";
import { connect } from "react-redux";

class ProductPrice extends Component {
  render() {
    const currentCurrency = this.props.currentCurrency;
    const prices = this.props.prices;

    const price = prices.find(
      (price) => price.currency.symbol === currentCurrency
    );

    return (
      <p className="product-price">
        {price.currency.symbol} {price.amount.toFixed(2)}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps)(ProductPrice);
