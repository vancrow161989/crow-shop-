import { createSlice } from "@reduxjs/toolkit";
import { setCartItemsToLocalStorage } from "../services/cartService";
import { deleteCartItemsToLocalStorage } from "./../services/cartService";

const initialState = {
  isOpen: false,
  cart: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  lastFetch: null,
  isLoading: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartRequested: (cart, action) => {
      cart.isLoading = true;
    },

    cartRequestFailed: (cart, action) => {
      cart.isLoading = false;
    },

    updateCartItems: (cart, action) => {
      cart.cart = action.payload;
    },

    cartClear: (cart, action) => {
      cart.cart = [];
    },

    cartTotals: (cart, action) => {
      const { itemTotal, quantity } = cart.cart.reduce(
        function getTotals(cartTotal, cartItem) {
          const { count, price } = cartItem;
          const itemTotal = count * price;
          cartTotal.itemTotal += itemTotal;
          cartTotal.quantity += count;
          return cartTotal;
        },
        {
          itemTotal: 0,
          quantity: 0
        }
      );
      cart.cartTotalAmount = itemTotal;
      cart.cartTotalQuantity = quantity;
    }
  }
});

const { cartClear, updateCartItems, cartTotals } = cartSlice.actions;

export default cartSlice.reducer;

export const addToLocalStorage = (cartItems) => (dispatch) => {
  return dispatch(updateCartItems(cartItems));
};

export const addItemToCart = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cart;
  let newCartItems = JSON.parse(JSON.stringify(cartItems));
  const index = newCartItems.findIndex((i) => i.productId == item.productId);

  if (index === -1) {
    newCartItems = [...newCartItems, item];
  } else {
    const newCount = newCartItems[index].count + item.count;
    newCartItems[index] = {
      ...item,
      count: newCount
    };
  }
  setCartItemsToLocalStorage(newCartItems);
  return dispatch(updateCartItems(newCartItems));
};

export const removeItemFromCart = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cart;
  let newCartItems = JSON.parse(JSON.stringify(cartItems));
  const index = newCartItems.findIndex((i) => i.productId === item);
  newCartItems.splice(index, 1);

  setCartItemsToLocalStorage(newCartItems);
  return dispatch(updateCartItems(newCartItems));
};

export const updateCartItemQuantity = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cart;
  let newCartItems = JSON.parse(JSON.stringify(cartItems));
  const index = newCartItems.findIndex(
    (cart) => cart.productId === item.productId
  );

  newCartItems[index].count = item.quantityCount;
  setCartItemsToLocalStorage(newCartItems);
  return dispatch(updateCartItems(newCartItems));
};

export const calculateCartTotals = () => (dispatch) => {
  return dispatch(cartTotals());
};

export const clearCart = () => (dispatch) => {
  deleteCartItemsToLocalStorage();
  return dispatch(cartClear());
};

//selectors

// export const getItemById = (itemId) =>
//   createSelector(
//     (state) => state.entities.cart,
//     (cart) =>
//       cart.items.products.data.filter((item) => item.id === parseInt(itemId))
//   );

// export const getBugsByUser = (userId) =>
//   createSelector(
//     (state) => state.entities.bugs,
//     (bugs) => bugs.list.filter((bug) => bug.userId === userId)
//   );
