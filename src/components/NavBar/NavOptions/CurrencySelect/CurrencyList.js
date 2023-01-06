import React, { Component } from "react";

class CurrencyList extends Component {
  render() {
    const { currencies, currentCurrency, changeCurrency } = this.props;
    return (
      <ul className="currency-list">
        {currencies.map((currency) => {
          const choosen = currency.symbol === currentCurrency;
          return (
            <li
              className={`currency-option ${choosen && "active"}`}
              key={currency.label}
              onClick={changeCurrency.bind(this, currency.symbol)}
            >
              {currency.symbol} {currency.label}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CurrencyList;
