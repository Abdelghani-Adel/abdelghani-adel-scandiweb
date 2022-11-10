import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions, fetchCartCurrencies } from "../../redux/slices/cart";
import {
  currencyActions,
  fetchCurrencies,
} from "../../redux/slices/currencies";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: this.props.currentCurrency,
      listIsShown: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCurrencies());
  }

  showOptions = () => {
    this.setState({
      ...this.state,
      listIsShown: !this.state.listIsShown,
    });
  };

  changeCurrency = (value) => {
    this.setState({
      currentCurrency: value,
      listIsShown: false,
    });

    this.props.dispatch(currencyActions.changeCurrency(value));
    this.props.dispatch(cartActions.changeCurrency(value));
  };

  render() {
    return (
      <li className="nav-option currency-selector">
        <p className="current-currency" onClick={this.showOptions}>
          {this.state.currentCurrency}
        </p>

        {this.state.listIsShown && (
          <ul className="currency-list">
            {this.props.currencies.map((currency) => (
              <li
                className="currency-option"
                key={currency.symbol}
                onClick={this.changeCurrency.bind(this, currency.symbol)}
              >
                {currency.symbol} {currency.label}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
  currencies: state.currency.currencies,
});

export default connect(mapStateToProps)(Currency);
