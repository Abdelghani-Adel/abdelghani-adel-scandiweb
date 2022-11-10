import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import cartIcon from "../../assets/cartWhite.png";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: null,
    existInCart: false,
  };

  componentDidMount() {
    const item = this.props.cartItems.findIndex(
      (item) => item.id === this.props.product.id
    );
    if (item !== -1) {
      this.setState({ ...this.state, existInCart: true });
    }
  }

  render() {
    const product = this.props.product;

    const navigateHandler = () => {
      this.setState({ navigate: true });
    };

    return (
      <>
        {this.state.navigate && <Navigate to={`/product/${product.id}`} />}
        <div className="product-wrapper" onClick={navigateHandler}>
          <div className={`product-card ${!product.inStock && "disabled"}`}>
            <div className="image-wrapper">
              <img src={product.gallery[0]} alt="" />
              {this.state.existInCart && (
                <span className="icon-wrapper">
                  <img src={cartIcon} alt="" />
                </span>
              )}
            </div>
            <p className="product-title">{product.name}</p>
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
