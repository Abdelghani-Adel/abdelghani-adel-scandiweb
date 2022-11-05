import React, { Component } from "react";
import DropSelect from "../DropSelect/DropSelect";
class CategoryName extends Component {
  state = {
    categories: [],
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
        this.setState({ categories: data.data.categories });
      });
  }

  render() {
    return <DropSelect options={this.state.categories} />;
  }
}

export default CategoryName;
