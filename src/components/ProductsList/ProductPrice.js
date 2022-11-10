import React, { Component } from "react";
import { connect } from "react-redux";

class ProductPrice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const prices = this.props.prices;
    const price = prices.find(
      (price) => price.currency.symbol == this.props.currentCurrency
    );

    return (
      <p className="product-price">
        {price.currency.symbol} {price.amount}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
});

export default connect(mapStateToProps)(ProductPrice);