import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../redux/slices/cart";

class ItemAttributes extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { item } = this.props;

    const changeAttribute = (e) => {
      const dataset = e.currentTarget.dataset.type;
      const options = document.querySelectorAll(
        `[data-type="${String(dataset)}"]`
      );

      [...options].forEach((option) => option.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const attributeType = dataset.replaceAll(" ", "");
      const attributeValue = e.currentTarget.dataset.value;

      const updatedItem = {
        ...item,
        attributesValues: {
          ...item.attributesValues,
          [attributeType]: attributeValue,
        },
      };

      const payload = {
        oldItem: item,
        newItem: updatedItem,
      };

      this.props.dispatch(cartActions.editItem(payload));
    };

    return (
      <div className="item-attributes">
        {item.attributes.map((attribute) => {
          return (
            <div key={Math.random()}>
              <p className="attribute-title">{attribute.name}:</p>

              <div className="options">
                {attribute.type === "swatch" &&
                  attribute.items.map((option) => {
                    const choosen = option.value == item.attributesValues.Color;
                    return (
                      <div
                        className={`swatch-option attribute-option ${
                          choosen && "active"
                        }`}
                        key={Math.random()}
                        onClick={changeAttribute}
                        data-type={attribute.id}
                        data-value={option.value}
                      >
                        <div style={{ backgroundColor: option.value }}></div>
                      </div>
                    );
                  })}

                {attribute.type !== "swatch" &&
                  attribute.items.map((option) => {
                    const attributeID = attribute.id.replaceAll(" ", "");
                    const choosen =
                      option.value === item.attributesValues[`${attributeID}`];

                    return (
                      <div
                        className={`option attribute-option ${
                          choosen && "active"
                        }`}
                        key={Math.random()}
                        onClick={changeAttribute}
                        data-type={attribute.id}
                        data-value={option.value}
                      >
                        {option.displayValue}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect()(ItemAttributes);
