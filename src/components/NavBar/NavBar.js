import React from "react";
import NavList from "./NavList";
import NavOptions from "./NavOptions/NavOptions";
import Logo from "./Logo";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="nav-bar fw-600">
        <NavList />
        <Logo />
        <NavOptions />
      </nav>
    );
  }
}

export default NavBar;
