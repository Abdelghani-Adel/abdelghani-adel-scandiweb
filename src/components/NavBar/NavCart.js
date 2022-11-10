import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";

class NavCart extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: null,
  };

  render() {
    const navigateHandler = () => {
      this.setState({ navigate: true });
    };
    return (
      <>
        {this.state.navigate && <Navigate to="/cart" />}
        <li className="nav-option nav-cart">
          <Link to="/cart">
            <img src={CartIcon} alt="" />
            <span className="nav-cart-amount">
              <span>{this.props.cart.itemsAmount}</span>
            </span>
          </Link>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps)(NavCart);
