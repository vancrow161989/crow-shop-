import { categoriesApiUrl, baseUrl } from "../../config.json";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesSlice = createApi({
  reducerPath: "categoriesSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => categoriesApiUrl,
      providesTags: ["Categories"]
    })
  })
});

export const { useGetAllCategoriesQuery } = categoriesSlice;
