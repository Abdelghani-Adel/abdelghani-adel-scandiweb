import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrencies } from "../../../helper/fetchAPI";
import { cartActions } from "../../../redux/slices/cart";
// import {
//   currencyActions,
//   fetchCurrencies,
// } from "../../../redux/slices/currencies";
import OutsideAlerter from "../../OutsideAlerter/OutsideAlerter";
import CurrencyList from "./CurrencyList";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      listIsShown: false,
    };
  }

  componentDidMount() {
    // Fetching the currencies and store them in local state
    const fetchAPI = async () => {
      const currencies = await fetchCurrencies();
      this.setState({
        ...this.state,
        currencies: currencies,
      });
    };

    fetchAPI();
  }

  // Toggling the displaying of currencies list
  toggleOptions = () => {
    this.setState((state) => ({
      ...this.state,
      listIsShown: !state.listIsShown,
    }));
  };

  // Change currency handler
  changeCurrency = (value) => {
    this.setState({
      listIsShown: false,
    });

    // Change the currenct currency in the cart redux state
    this.props.dispatch(cartActions.changeCurrency(value));
  };

  clickOutsideHandler = () => {
    this.setState({ ...this.state, listIsShown: false });
  };

  render() {
    return (
      <li className="nav-option currency-selector">
        <p className="current-currency" onClick={this.toggleOptions}>
          {this.props.currentCurrency}
        </p>

        {this.state.listIsShown && (
          <OutsideAlerter alertFunction={this.clickOutsideHandler}>
            <CurrencyList
              currencies={this.state.currencies}
              currentCurrency={this.props.currentCurrency}
              changeCurrency={this.changeCurrency}
            />
          </OutsideAlerter>
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps)(CurrencySelect);
