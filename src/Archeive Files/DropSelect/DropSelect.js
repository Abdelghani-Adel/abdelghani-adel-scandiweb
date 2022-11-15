import React, { Component } from "react";
import { fetchCategories } from "../../helper/fetchAPI";

class DropSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelected: "all",
      optionsIsShown: false,
      categories: [],
    };
  }

  toggleOptions = () => {
    this.setState({
      ...this.state,
      optionsIsShown: !this.state.optionsIsShown,
    });
  };

  hideOptions = () => {
    this.setState({
      ...this.state,
      optionsIsShown: false,
    });
  };

  changeSelected = (value) => {
    this.setState({
      currentSelected: value,
      optionsIsShown: false,
    });

    this.props.changeFilter(value);
  };

  componentDidMount() {
    const fetchAPI = async () => {
      const categories = await fetchCategories();

      let categoryNames = [];
      categories.map((category) => categoryNames.push(category.name));

      // Storing categories in local state
      this.setState({ ...this.state, categories: categories });
    };

    fetchAPI();
  }

  render() {
    return (
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
    );
  }
}

export default DropSelect;
