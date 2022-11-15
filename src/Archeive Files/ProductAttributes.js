import React, { Component } from "react";

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="product-attributes">
        {this.props.attributes.map((attribute) => (
          <div key={Math.random()}>
            <p className="attribute-title">{attribute.name}:</p>

            <div className="options">
              {attribute.type === "swatch" &&
                attribute.items.map((item) => (
                  <div
                    className="swatch-option attribute-option"
                    key={Math.random()}
                    onClick={this.props.chooseColorHandler}
                    data-type={attribute.id}
                    data-value={item.value}
                  >
                    <div style={{ backgroundColor: item.value }}></div>
                  </div>
                ))}

              {attribute.type !== "swatch" &&
                attribute.items.map((item) => (
                  <div
                    className="option attribute-option"
                    key={Math.random()}
                    onClick={this.props.chooseAttribute}
                    data-type={attribute.id}
                    data-value={item.value}
                  >
                    {item.displayValue}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
