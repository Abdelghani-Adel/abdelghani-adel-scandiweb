import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrencies } from "../../../../helper/fetchAPI";
import { cartActions } from "../../../../redux/slices/cart";
// import {
//   currencyActions,
//   fetchCurrencies,
// } from "../../../redux/slices/currencies";
import OutsideAlerter from "../../../OutsideAlerter/OutsideAlerter";
import CurrencyList from "./CurrencyList";

import downArrow from "../../../../assets/arrow-down.svg";
import upArrow from "../../../.././assets/arrow-up.svg";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      listIsShown: false,
      arrow: true,
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
      ...state,
      listIsShown: !state.listIsShown,
      arrow: !state.arrow,
    }));
  };

  // Change currency handler
  changeCurrency = (value) => {
    this.setState({
      listIsShown: false,
      arrow: true,
    });

    // Change the currenct currency in the cart redux state
    this.props.dispatch(cartActions.changeCurrency(value));
  };

  clickOutsideHandler = () => {
    this.setState({ ...this.state, listIsShown: false, arrow: true });
  };

  render() {
    const arrowDown = this.state.arrow;
    return (
      <OutsideAlerter alertFunction={this.clickOutsideHandler}>
        <li className="nav-option currency-selector">
          <p className="current-currency" onClick={this.toggleOptions}>
            <span>{this.props.currentCurrency}</span>
            <img src={arrowDown ? downArrow : upArrow} />
          </p>

          {this.state.listIsShown && (
            <CurrencyList
              currencies={this.state.currencies}
              currentCurrency={this.props.currentCurrency}
              changeCurrency={this.changeCurrency}
            />
          )}
        </li>
      </OutsideAlerter>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currentCurrency,
});

export default connect(mapStateToProps)(CurrencySelect);
