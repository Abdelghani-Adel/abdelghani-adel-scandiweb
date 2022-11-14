import React from "react";
import { NavLink } from "react-router-dom";

class NavList extends React.Component {
  render() {
    const { links } = this.props;

    return (
      <ul className="nav-list">
        {links.map((link) => (
          <NavLink to={`/${link}`} key={link} className="nav-link">
            {link.toUpperCase()}
          </NavLink>
        ))}
      </ul>
    );
  }
}

export default NavList;
