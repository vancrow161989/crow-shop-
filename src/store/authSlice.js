import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwt } = action.payload;

      state.user = user;
      state.accessToken = jwt;
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth?.user;
export const selectCurrentToken = (state) => state?.auth?.accessToken;

export const storeCredentials =
  ({ user, jwt }) =>
  (dispatch) => {
    dispatch(setCredentials({ user, jwt }));
  };
