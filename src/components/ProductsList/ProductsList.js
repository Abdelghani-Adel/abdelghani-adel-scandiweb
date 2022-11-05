import React, { Component } from "react";
import { connect } from "react-redux";
import image from "../../assets/Product A.png";
import { fetchProducts } from "../../redux/slices/productsSlice";

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    products: [{ name: "all" }],
  };

  componentDidMount() {
    this.props.dispatch(fetchProducts());
    console.log(this.props.products);
  }

  render() {
    return (
      <div className="products-list">
        <div className="product-card">
          <img src={image} alt="" />
          <p className="product-title">Apollo Running Short</p>
          <p className="product-price">$ 50.00</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductsList);

// export default ProductsList;
