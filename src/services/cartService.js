const CART_KEY = "cart_products";

export const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem(CART_KEY);
  if (cartItems) return JSON.parse(cartItems);
  else return null;
};

export const setCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

export const deleteCartItemsToLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};
