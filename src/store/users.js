import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenLocalStorage } from "../services/authService";
import {
  usersApiUrl,
  myUserApiUrl,
  userRegistration,
  userLogin,
  baseUrl
} from "../../config.json";

export const userSlice = createApi({
  reducerPath: "userSlice",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getTokenLocalStorage();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Users", "UserMe"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: ({ id }) => `${usersApiUrl}/${id}`,
      providesTags: ["Users"]
    }),
    getMyUserData: builder.query({
      query: () => `${myUserApiUrl}`,
      providesTags: (result) => {
        return result ? [{ type: "UserMe", id: result.id }] : ["UserMe"];
      }
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: userRegistration,
        method: "POST",
        body: data
      }),
      invalidateTags: ["Users", "UserMe"]
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: userLogin,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }),
      invalidateTags: ["Users", "UserMe"]
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${usersApiUrl}/${userId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }),
      invalidateTags: ["Users", "UserMe"]
    })
  })
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
  useGetMyUserDataQuery
} = userSlice;
