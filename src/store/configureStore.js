import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { categoriesSlice } from "./categories";
import { userSlice } from "./users";
import cartReducer from "./cart";
import authReducer from "./authSlice";

export default function () {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [categoriesSlice.reducerPath]: categoriesSlice.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
      cart: cartReducer,
      auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiSlice.middleware,
        categoriesSlice.middleware,
        userSlice.middleware
      )
  });
}
