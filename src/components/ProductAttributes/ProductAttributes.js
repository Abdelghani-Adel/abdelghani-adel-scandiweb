import React, { Component } from "react";
import SwatchAttribute from "./SwatchAttribute";
import TextAttribute from "./TextAttribute";

class ProductAttributes extends Component {
  render() {
    const { attributes } = this.props;

    // will be used to check and decide which option will have active calss
    // will be only passed from the Cart component
    const { attributesValues } = this.props;

    // Function to handle active class on the options
    // will be only passed from product page
    const { selectAttribute } = this.props;

    return (
      <div className="product-attributes">
        {attributes.map((attribute) => (
          <div key={Math.random()} className="attribute-wrapper">
            <p className="attribute-title">{attribute.name}:</p>

            <div className="attribute-options">
              {attribute.type === "swatch" && (
                <SwatchAttribute
                  attribute={attribute}
                  attributesValues={attributesValues}
                  selectAttribute={selectAttribute}
                />
              )}

              {attribute.type !== "swatch" && (
                <TextAttribute
                  attribute={attribute}
                  attributesValues={attributesValues}
                  selectAttribute={selectAttribute}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
