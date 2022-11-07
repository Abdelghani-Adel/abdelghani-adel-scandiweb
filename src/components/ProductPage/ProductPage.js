import React, { Component } from "react";
import { connect } from "react-redux";

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedPhoto: 0,
  };

  changeImageHandler = (e) => {
    this.setState({ selectedPhoto: e });
  };

  render() {
    const urlParts = window.location.href.split("/");
    const productID = urlParts[urlParts.length - 1];
    const product = this.props.products.find(
      (product) => product.id === productID
    );

    console.log(product);

    return (
      <div className="product-page">
        <div className="pictures-list">
          {product.gallery.map((picture, index) => (
            <div
              className="image-wrapper"
              key={Math.random()}
              onClick={this.changeImageHandler.bind(this, index)}
            >
              <img src={picture} alt="" />
            </div>
          ))}
        </div>

        <div className="selected-photo">
          <img src={product.gallery[this.state.selectedPhoto]} alt="" />
        </div>

        <div className="product-info">
          <div className="product-name">{product.name}</div>

          {product.attributes[0].id === "Size" && (
            <div className="product-attributes">
              <p className="attribute-title">Size:</p>
              <div className="options">
                {product.attributes[0].items.map((item) => (
                  <div className="option" key={Math.random()}>
                    <span>{item.displayValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-price">
            <p>PRICE:</p>
            <p>
              {product.prices[0].currency.symbol} {product.prices[0].amount}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductPage);
