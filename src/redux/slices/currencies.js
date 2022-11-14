import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currentCurrency: "$",
  },
  reducers: {
    changeCurrency: (state, action) => {
      return { ...state, currentCurrency: action.payload };
    },
    buildCurrencies: (state, action) => {
      return { ...state, currencies: action.payload };
    },
  },
});

export const fetchCurrencies = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            currencies {
              label
              symbol
            }
          }
        `,
      }),
    });

    const data = await response.json();

    dispatch(currencyActions.buildCurrencies(data.data.currencies));
    return data.data.currencies;
  };
};

export const currencyActions = currencySlice.actions;
export default currencySlice;
