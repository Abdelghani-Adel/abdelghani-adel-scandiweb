import React, { Component } from "react";

class Currency extends Component {
  state = {
    currentCurrency: "$",
    listIsShown: false,
  };

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
  };

  render() {
    return (
      <li className="nav-option currency-selector">
        <p className="current-currency" onClick={this.showOptions}>
          {this.state.currentCurrency}
        </p>

        {this.state.listIsShown && (
          <ul className="currency-list">
            <li
              className="currency-option"
              onClick={this.changeCurrency.bind(this, "$")}
            >
              $ USD
            </li>
            <li
              className="currency-option"
              onClick={this.changeCurrency.bind(this, "€")}
            >
              € EUR
            </li>
            <li
              className="currency-option"
              onClick={this.changeCurrency.bind(this, "¥")}
            >
              ¥ JPY
            </li>
          </ul>
        )}
      </li>
    );
  }
}

export default Currency;
