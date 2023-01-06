import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { cartActions } from "../../redux/slices/cart";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

class ProductCard extends Component {
  state = {
    navigate: null,
  };

  render() {
    const product = this.props.product;

    // Will be true only if the product is in stock and don't have any attributes
    // because the user cannot add an item to the cart without selected attributes
    const addFromPLP = product.inStock && product.attributes.length < 1;

    const navigateHandler = () => {
      this.setState({ navigate: true });
    };

    const addToCartHandler = (e) => {
      if (!product.inStock) {
        return;
      }

      // Because the parent has a click handler that will navigate the user to the PDP
      e.stopPropagation();

      let attributesValues = {};

      product.attributes.forEach((attribute) => {
        const attributeType = attribute.name.replaceAll(" ", "");
        const attributeValue = attribute.items[0].value;

        attributesValues[attributeType] = attributeValue;
      });

      console.log(product);

      // Preparing the product object to be dispatched and stored into Redux
      const productObject = {
        amount: 1,
        ...product,
        attributesValues: attributesValues,
      };
      this.props.dispatch(cartActions.addItem(productObject));
    };

    const cardClassNames = `product-card ${!product.inStock && "disabled"}`;

    return (
      <>
        {this.state.navigate && <Navigate to={`/product/${product.id}`} />}

        <div className="product-wrapper">
          <div className={cardClassNames} onClick={navigateHandler}>
            <ProductImage
              image={product.gallery[0]}
              addToCartHandler={addToCartHandler}
              addFromPLP={addFromPLP}
            />

            <p className="product-title">
              {product.brand} {product.name}
            </p>

            <ProductPrice prices={product.prices} />
          </div>
        </div>
      </>
    );
  }
}

export default connect()(ProductCard);
