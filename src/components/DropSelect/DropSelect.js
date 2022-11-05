import React, { Component } from "react";

class DropSelect extends Component {
  state = {
    currentSelected: "all",
    optionsIsShown: false,
  };

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
  };

  render() {
    const { options } = this.props;
    return (
      <div className="drop-select">
        <p className="current-selected" onClick={this.toggleOptions}>
          {this.state.currentSelected}
        </p>

        {this.state.optionsIsShown && (
          <ul className="options">
            {options.map((option) => (
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
