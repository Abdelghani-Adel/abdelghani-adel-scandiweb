import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../redux/slices/cart";
import ProductPrice from "../../components/ProductsList/ProductPrice";
import PicturesList from "./PicturesList";
import ProductAttributes from "../../components/ProductAttributes/ProductAttributes";
import { fetchProduct } from "../../helper/fetchAPI";

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedPhoto: 0, // Control which picture is shown in the main area
    validOrder: null,
  };

  componentDidMount() {
    // Pulling out the product ID from the url
    const urlParts = window.location.href.split("/");
    const productID = urlParts[urlParts.length - 1];

    // Fetching the product from the API using the product ID
    // Store the product in the local state to be used in rendering
    const fetchApi = async () => {
      const product = await fetchProduct(productID);

      this.setState({
        ...this.state,
        product: product,
      });
    };
    fetchApi();
  }

  selectImage = (e) => {
    this.setState({ selectedPhoto: e });
  };

  // Handling active class on attribute options
  selectAttribute = (e) => {
    const type = e.currentTarget.dataset.type;
    const options = document.querySelectorAll(`[data-type="${String(type)}"]`);

    [...options].forEach((option) => option.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  render() {
    const product = this.state.product;

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
        ...this.state.product,
        attributesValues: { ...attributesValues },
      };

      // Dispatching the product object to the cartSlice to be added to the cart
      this.props.dispatch(cartActions.addItem(productObject));
    };

    return (
      <>
        {product && (
          <div className="product-page">
            <PicturesList
              gallery={product.gallery}
              changeImageHandler={this.selectImage}
            />

            <div className="selected-photo">
              <img
                src={product.gallery[this.state.selectedPhoto]}
                alt="Product Image"
              />
            </div>

            <div className="product-info">
              <div className="product-brand">{product.brand}</div>
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
                  <span className="valid-error">
                    Options need to be choosen!
                  </span>
                )}
              </div>

              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductPage);
