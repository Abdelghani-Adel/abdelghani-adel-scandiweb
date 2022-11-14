import React, { Component } from "react";
import DropSelect from "../DropSelect/DropSelect";

class CategoryName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <DropSelect changeFilter={this.props.changeFilter} />;
  }
}

export default CategoryName;
