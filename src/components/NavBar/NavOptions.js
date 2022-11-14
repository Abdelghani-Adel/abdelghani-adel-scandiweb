import React, { Component } from "react";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import NavCart from "./NavCart";

class NavOptions extends Component {
  render() {
    return (
      <ul className="nav-options">
        <CurrencySelect />
        <NavCart />
      </ul>
    );
  }
}

export default NavOptions;
