import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { productsApiUrl } from "../../config.json";

const productsAdapter = createEntityAdapter({
  selectId: (data) => data.id,
  sortComparer: (a, b) =>
    b.attributes.publishedAt.localeCompare(a.attributes.publishedAt)
});

const initialState = productsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (options) => {
        if (options) return productsApiUrl + options;
        return productsApiUrl;
      },
      transformResponse: (responseData) => {
        return productsAdapter.setAll(
          { ...initialState, meta: responseData.meta },
          responseData.data
        );
      },

      providesTags: ["Product"]
    })
  })
});

export const { useGetProductsQuery } = extendedApiSlice;

// returns te query result object
export const selectProductsResult =
  extendedApiSlice.endpoints.getProducts.select();

// creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds
  // Pass in a selector that returns the posts slice of state
} = productsAdapter.getSelectors(
  (state) => selectProductsData(state) ?? initialState
);
