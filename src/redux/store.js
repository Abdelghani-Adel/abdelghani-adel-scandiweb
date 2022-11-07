import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./slices/currencies";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    currency: currencySlice.reducer,
  },
});

export default store;
