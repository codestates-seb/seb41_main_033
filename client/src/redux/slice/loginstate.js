import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const Logined = createSlice({
  name: "logined",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state, action) => {
      state.logout = action.payload;
    },
  },
});
export default Logined;
export const { login, logout } = Logined.actions;
