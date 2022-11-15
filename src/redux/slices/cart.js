import { createSlice, current } from "@reduxjs/toolkit";

const findItem = (state, product) => {
  let index = null;
  let foundProduct = null;
  let itemPrice = product.prices.find(
    (price) => price.currency.symbol === state.currentCurrency
  );

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
  return { oldItem: foundProduct, itemIndex: index, price: itemPrice };
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
    getCartFromLocalstorage(state) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));

      return { ...state, ...cart, cartIsShown: false };
    },
    editItem(state, action) {
      console.log(window.localStorage.getItem("cart"));
      // Pull out needed information of the old existed item in the cart
      const { oldItem, itemIndex, price } = findItem(state, action.payload);

      // Declare the new item with new properties that comes through the action.payload
      const newItem = action.payload;

      // Updating items amount
      // removing the item amount completely from the total amount
      // add the new amount that comes through the action
      let updatedItemsAmount =
        state.itemsAmount - oldItem.amount + newItem.amount;

      // Calculating the total price of the existing item to be removed
      const oldItemTotalPrice = oldItem.amount * price.amount;
      // Calculating the total price of the new edited item to be added
      const newItemTotalPrice = newItem.amount * price.amount;
      // Updating the total amount by removing the old item total and add the new item total
      let updatedTotalAmount =
        state.totalAmount - oldItemTotalPrice + newItemTotalPrice;

      // Replace the existed item in the cart with the new item
      let updatedItems = [...state.items];
      updatedItems[itemIndex] = { ...newItem };

      const newState = {
        ...state,
        items: updatedItems,
        itemsAmount: updatedItemsAmount,
        totalAmount: updatedTotalAmount,
      };

      // Storing the cart to local state in the browser
      window.localStorage.setItem("cart", JSON.stringify(newState));

      // Returning the new state
      return newState;
    },
    removeItem(state, action) {
      // Pull out the needed information
      const { itemIndex, price } = findItem(state, action.payload);

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

      const newState = {
        ...state,
        items: updatedItems,
        itemsAmount: updatedItemsAmount,
        totalAmount: updatedTotalAmount,
      };

      // Storing the cart to local state in the browser
      window.localStorage.setItem("cart", JSON.stringify(newState));

      // Returning the new state
      return newState;
    },
    addItem(state, action) {
      // Checking if the item is already added to cart before
      const { oldItem, itemIndex, price } = findItem(state, action.payload);

      // updating itemsAmount and total amount
      // the user is allowed to add one item per click
      // So the payload.amount will always be 1
      // This can be edited here if I give the person the ability to choose the amount
      // he wants to add from PLP or PDP or ever the cart page
      const updatedItemsAmount = state.itemsAmount + 1;
      const updatedTotalAmount = state.totalAmount + price.amount;

      let updatedItems;

      // I have 2 posibilities here
      // [1] the item is part of the cart
      // [2] the item is not part of the cart
      if (oldItem) {
        const updatedItem = {
          ...oldItem,
          amount: oldItem.amount + action.payload.amount,
          price: price,
        };

        updatedItems = [...state.items];
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

      const newState = {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        itemsAmount: updatedItemsAmount,
      };

      // Storing the cart to local state in the browser
      window.localStorage.setItem("cart", JSON.stringify(newState));

      // Returning the new state
      return newState;
    },
    changeCurrency: (state, action) => {
      let updatedItems = [];
      let newTotalAmount = 0;

      const newCurrency = action.payload;

      // Loop through all current items to change their price to the new currency
      state.items.map((item) => {
        // Finding the new price of the item based on the choosen currency
        const newPrice = item.prices.find(
          (price) => price.currency.symbol === newCurrency
        );
        // Calculating the new total amount value based on the choosen currency
        newTotalAmount += newPrice.amount * item.amount;
        // Preparing the new item with the new choosen price
        const newItem = { ...item, price: newPrice };
        // Push the new item the newItems array to be returned
        updatedItems.push(newItem);
      });

      const newState = {
        ...state,
        items: updatedItems,
        currentCurrency: newCurrency,
        totalAmount: newTotalAmount,
      };

      // Storing the cart to local state in the browser
      window.localStorage.setItem("cart", JSON.stringify(newState));

      // Returning the new state
      return newState;
    },
    togglePortal: (state) => {
      return {
        ...state,
        cartIsShown: !state.cartIsShown,
      };
    },
    closePortal: (state) => {
      return {
        ...state,
        cartIsShown: false,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
