import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
