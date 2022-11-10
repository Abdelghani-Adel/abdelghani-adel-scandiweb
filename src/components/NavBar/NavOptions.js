import React, { Component } from "react";
import Currency from "./Currency";
import NavCart from "./NavCart";

class NavOptions extends Component {
  state = {};
  render() {
    return (
      <ul className="nav-options">
        <Currency />
        <NavCart />
      </ul>
    );
  }
}

export default NavOptions;
