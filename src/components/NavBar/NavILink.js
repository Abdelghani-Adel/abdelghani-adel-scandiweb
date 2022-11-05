import React from "react";
import { Link, NavLink } from "react-router-dom";

class NavItem extends React.Component {
  state = {};

  render() {
    const { title } = this.props;
    return (
      <NavLink to={`/${title}`} className="nav-link">
        {title.toUpperCase()}
      </NavLink>
    );
  }
}

export default NavItem;
