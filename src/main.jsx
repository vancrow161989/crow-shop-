import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./store/productsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import "./index.css";

const store = configureStore();

store.dispatch(extendedApiSlice.endpoints.getProducts.initiate());

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
