import React from "react";
import NavLink from "./NavILink";

class NavList extends React.Component {
  state = {};
  render() {
    const { links } = this.props;
    return (
      <ul className="nav-list">
        {links.map((link) => (
          <NavLink key={Math.random()} title={link} />
        ))}
      </ul>
    );
  }
}

export default NavList;
