import React, { Component } from "react";
import { LoadCategories } from "../../graphql/Queries";
import OutsideAlerter from "../OutsideAlerter/OutsideAlerter";

class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelected: "all",
      optionsIsShown: false,
      categories: [],
    };
  }

  // Fetching categories and store them in local state
  // Will be used to render the category options list
  componentDidMount() {
    const fetchAPI = async () => {
      const categories = await LoadCategories();

      let categoryNames = [];
      categories.map((category) => categoryNames.push(category.name));

      // Storing categories in local state
      this.setState({ ...this.state, categories: categories });
    };

    fetchAPI();
  }

  // Toggle displaying category options list
  // Fired on clicking on the category name
  toggleOptions = () => {
    this.setState({
      ...this.state,
      optionsIsShown: !this.state.optionsIsShown,
    });
  };

  // Hiding the category options list
  // Fired on choosing the category || clicking ouside of it
  hideOptions = () => {
    this.setState({
      ...this.state,
      optionsIsShown: false,
    });
  };

  // Update the local state with the new category filter
  // Execute a function that fetches the api with new category filter
  // and store the retured products in the parent's state to render them
  changeSelected = (value) => {
    this.setState({
      currentSelected: value,
      optionsIsShown: false,
    });

    this.props.changeFilter(value);
  };

  render() {
    return (
      <OutsideAlerter alertFunction={this.hideOptions}>
        <div className="drop-select">
          <p
            className="current-selected category-name"
            onClick={this.toggleOptions}
          >
            {this.state.currentSelected}
          </p>

          {this.state.optionsIsShown && (
            <ul className="options">
              {this.state.categories.map((option) => (
                <li
                  key={Math.random()}
                  className="option"
                  onClick={this.changeSelected.bind(this, option.name)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </OutsideAlerter>
    );
  }
}

export default CategoryFilter;
