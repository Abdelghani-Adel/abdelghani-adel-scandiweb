import React, { Component } from "react";

class TextAttribute extends Component {
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
              className={`attribute-option txt-attribute ${
                choosen && "active"
              }`}
              key={Math.random()}
              data-type={attribute.id}
              data-value={item.value}
              onClick={this.props.selectAttribute}
            >
              {item.displayValue}
            </div>
          );
        })}
      </>
    );
  }
}

export default TextAttribute;
