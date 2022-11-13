import { createSlice, current } from "@reduxjs/toolkit";

const findItem = (state, product) => {
  let index = null;
  let foundProduct = null;
  let itemPrice = product.prices.find(
    (price) => price.currency.symbol === state.currentCurrency
  );

  // if (Object.keys(product.attributesValues).length === 0) {
  //   foundProduct = product;
  //   index = state.items.findIndex((element) => element.id === product.id);
  // }
  try {
    index = state.items.findIndex((element) => {
      if (element.id === product.id) {
        if (
          JSON.stringify(element.attributesValues) ===
          JSON.stringify(product.attributesValues)
        ) {
          return element;
        }

        if (Object.keys(element.attributesValues).length === 0) {
          return element;
        }
      }
    });
    foundProduct = current(state.items[index]);
  } catch (e) {}
  return { item: foundProduct, itemIndex: index, price: itemPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    currentCurrency: "$",
    itemsAmount: 0,
    totalAmount: 0,
    cartIsShown: false,
  },
  reducers: {
    editItem(state, action) {
      // Pull out information needed
      const { item, itemIndex, price } = findItem(
        state,
        action.payload.oldItem
      );

      // Make a copy of the cart items to be edited and returned
      let updatedItems = [...state.items];

      const oldItem = item;
      const newItem = action.payload.newItem;

      // Updating items amount
      // removing the item amount completely from the total amount
      // add the new amount that comes through the action

      let updatedItemsAmount = state.itemsAmount - item.amount + newItem.amount;

      // Calculating the total price of the existing item to be removed
      const oldItemTotalPrice = item.amount * price.amount;
      // Calculating the total price of the new edited item to be added
      const newItemTotalPrice = newItem.amount * price.amount;
      // Updating the total amount by removing the old item total and add the new item total
      let updatedTotalAmount =
        state.totalAmount - oldItemTotalPrice + newItemTotalPrice;

      // Replace the existed item in the cart with the new item
      updatedItems[itemIndex] = { ...newItem };

      // Returning the new state
      return {
        ...state,
        items: updatedItems,
        itemsAmount: updatedItemsAmount,
        totalAmount: updatedTotalAmount,
      };
    },
    removeItem(state, action) {
      // Pull out the needed information
      const { item, itemIndex, price } = findItem(state, action.payload);

      // Create a copy of the cart items to be edited and returned
      let updatedItems = [...state.items];

      // Filter the deleted item out of the updated items array
      updatedItems = updatedItems.filter(
        (element, index) => index !== itemIndex
      );

      // Updating items amount
      const updatedItemsAmount = state.itemsAmount - 1;
      // Updating total amount
      const updatedTotalAmount = state.totalAmount - price.amount;

      // Returning the new state after deletion
      return {
        ...state,
        items: updatedItems,
        itemsAmount: updatedItemsAmount,
        totalAmount: updatedTotalAmount,
      };
    },
    addItem(state, action) {
      // Pull out the needed information
      const { item, itemIndex, price } = findItem(state, action.payload);

      // updating itemsAmount
      const updatedItemsAmount = state.itemsAmount + action.payload.amount;

      // Updating the total amount of the cart
      const updatedTotalAmount =
        state.totalAmount + price.amount * action.payload.amount;

      let updatedItems;

      // Checking if the item is part of the cart already
      if (item) {
        const updatedItem = {
          ...item,
          amount: item.amount + action.payload.amount,
          price: price,
        };
        // Create a copy of the cart items to be edited and returned
        updatedItems = [...state.items];
        // edit only the needed item
        updatedItems[itemIndex] = updatedItem;
      } else {
        // Preparing the new item with the right price based on on the user preferences
        const newItem = {
          ...action.payload,
          price: price,
        };

        // add the prepared new item to the variable to be returned
        updatedItems = state.items.concat(newItem);
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        itemsAmount: updatedItemsAmount,
      };
    },
    changeCurrency: (state, action) => {
      let updatedItems = [];
      let totalAmount = 0;

      // Loop through all current items to change their price to the new currency
      state.items.map((item) => {
        // Finding the new price based on the choosen currency
        const newPrice = item.prices.find(
          (price) => price.currency.symbol === action.payload
        );
        // Calculating the new total amount value based on the choosen currency
        totalAmount += newPrice.amount * item.amount;
        // Preparing the new item with the new choosen price
        const newItem = { ...item, price: newPrice };
        // Push the new item the newItems array to be returned
        updatedItems.push(newItem);
      });

      return {
        items: updatedItems,
        currentCurrency: action.payload,
        itemsAmount: state.itemsAmount,
        totalAmount: totalAmount,
      };
    },
    togglePortal: (state, action) => {
      return {
        ...state,
        cartIsShown: !state.cartIsShown,
      };
    },
    closePortal: (state, action) => {
      return {
        ...state,
        cartIsShown: false,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
