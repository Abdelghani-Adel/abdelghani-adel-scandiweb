import React, { Component } from "react";
import { connect } from "react-redux";
import CartIcon from "../../assets/cart.svg";
import MiniCart from "../../pages/CartPage/MiniCart";
import { cartActions } from "../../redux/slices/cart";
import Portal from "../Portal/portal";

class NavCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cartIsShown = this.props.cart.cartIsShown;
    const closePortal = () => {
      this.props.dispatch(cartActions.closePortal());
    };

    const toggleMinicart = () => {
      this.props.dispatch(cartActions.togglePortal());
    };
    return (
      <>
        {cartIsShown && (
          <Portal
            component={<MiniCart closePortal={closePortal} />}
            closePortal={closePortal}
          />
        )}

        <li className="nav-option nav-cart" onClick={toggleMinicart}>
          <div>
            <img src={CartIcon} alt="" />
            <span className="nav-cart-amount">
              <span>{this.props.cart.itemsAmount}</span>
            </span>
          </div>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps)(NavCart);
