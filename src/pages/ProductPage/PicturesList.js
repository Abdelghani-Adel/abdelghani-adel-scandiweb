import React, { Component } from "react";

class PicturesList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pictures-list">
        {this.props.gallery.map((picture, index) => (
          <div
            className="image-wrapper"
            key={Math.random()}
            onClick={this.props.changeImageHandler.bind(this, index)}
          >
            <img src={picture} alt="" />
          </div>
        ))}
      </div>
    );
  }
}

export default PicturesList;
