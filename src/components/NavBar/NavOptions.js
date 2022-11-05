import React, { Component } from "react";
import CartIcon from "../../assets/cart.svg";
import Currency from "./Currency";

class NavOptions extends Component {
  state = {};
  render() {
    return (
      <ul className="nav-options">
        <Currency />
        <li className="nav-option">
          <img src={CartIcon} alt="" />
        </li>
      </ul>
    );
  }
}

export default NavOptions;
