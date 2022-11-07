import React, { Component } from "react";

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
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            categories {
              name
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, categories: data.data.categories });
      });
  }

  render() {
    return (
      <div className="drop-select">
        <p className="current-selected" onClick={this.toggleOptions}>
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
