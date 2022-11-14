import React from "react";
import NavList from "./NavList";
import NavOptions from "./NavOptions";
import Logo from "./Logo";
import { fetchCategories } from "../../helper/fetchAPI";

class NavBar extends React.Component {
  state = {
    categoryNames: [],
  };

  componentDidMount() {
    const fetchAPI = async () => {
      const categoreis = await fetchCategories();

      // Pull out the names of categories to be stored in local state
      let categoryNames = [];
      categoreis.map((category) => categoryNames.push(category.name));

      // Storing categories in local state
      this.setState({ categoryNames: categoryNames });
    };
    fetchAPI();
  }

  render() {
    return (
      <nav className="nav-bar">
        <NavList links={this.state.categoryNames} />
        <Logo />
        <NavOptions />
      </nav>
    );
  }
}

export default NavBar;
