import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";
import currencySlice from "./slices/currencies";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    currency: currencySlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
