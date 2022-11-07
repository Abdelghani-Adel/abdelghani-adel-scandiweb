import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    replaceProducts: (state, action) => {
      return action.payload;
    },
    filterProducts: (state, action) => {
      const newProducts = state.filter(
        (product) => product.category === action.payload
      );

      return newProducts;
    },
  },
});

export const fetchProducts = (filter) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            categories {
            name
            products {
              id
              name
              inStock
              description
              category
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
              gallery
              attributes {
                id
                name
                type
                items {
                  id
                  value
                  displayValue
                }
              }
            }
          }
          }
        `,
      }),
    });
    const data = await response.json();

    let theFilter = 0;
    if (filter === "clothes") {
      theFilter = 1;
    } else if (filter === "tech") {
      theFilter = 2;
    }

    dispatch(
      productsActions.replaceProducts(data.data.categories[theFilter].products)
    );
  };
};

export const productsActions = productsSlice.actions;

export default productsSlice;
