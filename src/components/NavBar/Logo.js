import React, { Component } from "react";
import logo from "../../assets/logo.png";

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}

export default Logo;
