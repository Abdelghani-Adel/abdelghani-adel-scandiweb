import React, { Component } from "react";

class TextAttribute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { attribute, attributesValues, selectAttribute } = this.props;
    const items = attribute.items;

    // Some IDs in not one word, so it can't be used for access object property or anything
    // So, I make it one word with no spaces
    const attributeID = attribute.id.replaceAll(" ", "");

    // This boolean will only be used in product attributes in the cart component
    let choosen = false;

    // In the try catch code block I check if the attribtue item's value
    // is part of the attributesValues array which will be only passed
    // from the cart component
    // If I didn't use try catch block will through an error when using this
    // component in the PLP because there is attributesValues array got passed in

    // attribute-option class name doesn't have any css rules
    // I just use it in selecting active attributes to add them to the product object
    // which then will be sent to the cart

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
              onClick={selectAttribute}
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
