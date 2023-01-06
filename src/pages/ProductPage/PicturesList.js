import React, { Component } from "react";

class PicturesList extends Component {
  render() {
    const { gallery, changeImageHandler } = this.props;

    return (
      <div className="pictures-list">
        {gallery.map((picture, index) => (
          <div
            className="image-wrapper"
            key={Math.random()}
            onClick={changeImageHandler.bind(this, index)}
          >
            <img src={picture} alt="Product" />
          </div>
        ))}
      </div>
    );
  }
}

export default PicturesList;
