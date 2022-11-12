import React from "react";
import NavList from "./NavList";
import NavOptions from "./NavOptions";

class NavBar extends React.Component {
  state = {};
  render() {
    return (
      <nav className="nav-bar">
        <NavList links={["all", "clothes", "tech"]} />
        <NavOptions />
      </nav>
    );
  }
}

export default NavBar;
