import React, { Component } from "react";

class SwatchAttribute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { attribute } = this.props;
    const { attributesValues } = this.props;
    const items = attribute.items;

    const attributeID = attribute.id.replaceAll(" ", "");
    let choosen = false;

    return (
      <>
        {items.map((item) => {
          try {
            choosen = item.value === attributesValues[`${attributeID}`];
          } catch (e) {}

          return (
            <div
              className={`attribute-option swatch-attribute ${
                choosen && "active"
              }`}
              key={Math.random()}
              data-type={attribute.id}
              data-value={item.value}
              onClick={this.props.selectAttribute}
            >
              <div style={{ backgroundColor: item.value }}></div>
            </div>
          );
        })}
      </>
    );
  }
}

export default SwatchAttribute;
