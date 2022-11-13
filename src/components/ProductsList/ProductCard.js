import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import cartIcon from "../../assets/cartWhite.png";
import { cartActions } from "../../redux/slices/cart";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: null,
  };

  render() {
    const product = this.props.product;

    // Will be true only the product is in stock and don't have any attributes
    // because the user cannot add an item to the cart without selected attributes
    let canAddFromPLP;
    if (product.inStock && product.attributes.length < 1) {
      canAddFromPLP = true;
    }

    const navigateHandler = (e) => {
      if (
        e.target.classList.contains("icon-wrapper") ||
        e.target.classList.contains("cart-icon")
      ) {
        return;
      }
      this.setState({ navigate: true });
    };

    const addToCartHandler = () => {
      const productObject = {
        amount: 1,
        ...product,
        attributesValues: {},
      };
      this.props.dispatch(cartActions.addItem(productObject));
    };

    return (
      <>
        {this.state.navigate && <Navigate to={`/product/${product.id}`} />}
        <div className="product-wrapper">
          <div
            className={`product-card ${!product.inStock && "disabled"}`}
            onClick={navigateHandler}
          >
            <div className="image-wrapper">
              <img src={product.gallery[0]} alt="" />
              {canAddFromPLP && (
                <span className="icon-wrapper" onClick={addToCartHandler}>
                  <img src={cartIcon} className="cart-icon" />
                </span>
              )}
            </div>
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

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps)(ProductCard);
