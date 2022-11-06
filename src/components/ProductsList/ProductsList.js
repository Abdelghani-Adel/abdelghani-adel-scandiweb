import React, { Component } from "react";
import { connect } from "react-redux";
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
        {this.props.products.map((product) => (
          <div className="product-wrapper" key={product.id}>
            <div className={`product-card ${!product.inStock && "disabled"}`}>
              <div className="image-wrapper">
                <img src={product.gallery[0]} alt="" />
              </div>
              <p className="product-title">{product.name}</p>
              <p className="product-price">
                {product.prices[0].currency.symbol}
                {product.prices[0].amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ProductsList);

// export default ProductsList;
