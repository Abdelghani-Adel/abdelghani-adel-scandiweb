import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../../redux/slices/cart";
import OutsideAlerter from "../../../OutsideAlerter/OutsideAlerter";
import CurrencyList from "./CurrencyList";
import upArrow from "../../../.././assets/arrow-up.svg";
import downArrow from "../../../../assets/arrow-down.svg";
import { LoadCurrencies } from "../../../../graphql/Queries";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIsShown: false,
      arrow: true,
    };
  }

  componentDidMount() {
    const fetchCurrencies = async () => {
      const currencies = await LoadCurrencies();
      this.setState({
        ...this.state,
        currencies: currencies,
      });
    };

    fetchCurrencies();
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
            <img src={arrowDown ? downArrow : upArrow} alt="Arrow" />
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
