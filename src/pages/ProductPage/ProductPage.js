import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../redux/slices/cart";
import ProductPrice from "../../components/ProductsList/ProductPrice";
import PicturesList from "./PicturesList";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    // selecting which photo is shown in the big area based on its index in the gallery array
    selectedPhoto: 0,
    validOrder: null,
  };

  changeImageHandler = (e) => {
    this.setState({ selectedPhoto: e });
  };

  // Handling active class on color options
  chooseColorHandler = (e) => {
    const colors = document.querySelectorAll(".swatch-option");
    [...colors].forEach((color) => color.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  // Handling active class on other attribute options
  selectAttribute = (e) => {
    const type = e.currentTarget.dataset.type;
    const options = document.querySelectorAll(`[data-type="${String(type)}"]`);

    [...options].forEach((option) => option.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  render() {
    // Selecting the product id out from the url params
    const urlParts = window.location.href.split("/");
    // The product id always will be the last item in the array of urlParts that we've created
    const productID = urlParts[urlParts.length - 1];
    // Expecting the products array through the props to select the current product based on the ID
    const product = this.props.products.find(
      (product) => product.id === productID
    );

    const addToCartHandler = () => {
      if (!this.state.validOrder) {
        this.setState({ ...this.state, validOrder: true });
      }
      // Collecting the selected attributes using the the active class that being added when selecting the attribute
      // So, I select all elements that have the 2 classes which only are added if the attribute is selected
      const attributes = document.querySelectorAll(".attribute-option.active");
      let attributesValues = {};
      // Looping through the selected attributes elements to add them to the attributesValues object
      [...attributes].forEach((attribute) => {
        // There are 2 data attributes 'data-type | data-value' are added with the values to the html elements
        // So, I access the html element first, then I access its dataset values to build my attribute object
        const attributeType = attribute.dataset.type.replaceAll(" ", "");
        const attributeValue = attribute.dataset.value;
        // Adding the attribute object to the attributeValues object
        attributesValues[attributeType] = attributeValue;
      });

      if ([...attributes].length < product.attributes.length) {
        this.setState({ ...this.state, validOrder: false });
        return;
      }

      // Preparing and building the product object which will be sent to the cart
      // The whole product object is added within because in the cart slice I will use some of the properties
      // of the product object in some tasks like selecting the price based on the selected currency
      const productObject = {
        amount: 1,
        ...product,
        attributesValues: { ...attributesValues },
      };

      // Dispatching the product object to the cartSlice to be added to the cart
      this.props.dispatch(cartActions.addItem(productObject));
    };

    return (
      <div className="product-page">
        <PicturesList
          gallery={product.gallery}
          changeImageHandler={this.changeImageHandler}
        />

        <div className="selected-photo">
          <img src={product.gallery[this.state.selectedPhoto]} alt="" />
        </div>

        <div className="product-info">
          <div className="product-name">{product.name}</div>

          <ProductAttributes
            attributes={product.attributes}
            selectAttribute={this.selectAttribute}
          />

          <div className="product-price">
            <p className="attribute-title">PRICE:</p>
            <ProductPrice prices={product.prices} />
          </div>

          <div className="button-wrapper">
            <button onClick={addToCartHandler} disabled={!product.inStock}>
              {product.inStock ? "Add To Cart" : "Out of stock"}
            </button>
            {this.state.validOrder == false && (
              <span className="valid-error">Options need to be choosen!</span>
            )}
          </div>

          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductPage);
