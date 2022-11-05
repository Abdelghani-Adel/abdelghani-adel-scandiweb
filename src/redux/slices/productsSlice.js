import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    replaceProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            category {
              products {
                id
                name
                inStock
                gallery
                description
                category
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
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
        `,
      }),
    });
    const data = await response.json();

    // console.log(data.data.category.products);
    dispatch(productsActions.replaceProducts(data.data.category.products));
  };
};

export const productsActions = productsSlice.actions;

export default productsSlice;
