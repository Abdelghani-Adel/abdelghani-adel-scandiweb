import React from "react";
import { NavLink } from "react-router-dom";
import { LoadCategories } from "../../graphql/Queries";

class NavList extends React.Component {
  state = { categoryNames: null };

  componentDidMount() {
    const fetchAPI = async () => {
      const categories = await LoadCategories();

      // Pull out the names of categories to be stored in local state
      let categoryNames = [];
      categories.map((category) => categoryNames.push(category.name));

      // Storing categories in local state
      this.setState({ categoryNames: categoryNames });
    };
    fetchAPI();
  }

  render() {
    return (
      <>
        {this.state.categoryNames && (
          <ul className="nav-list">
            <NavLink to="/all" className="nav-link">
              All
            </NavLink>
          </ul>
        )}
      </>
    );
  }
}

export default NavList;
