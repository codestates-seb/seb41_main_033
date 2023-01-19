import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("key");

const initialState = {
  isLogin: !!token,
  accessToken: token,
};

const Logined = createSlice({
  name: "logined",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});
export default Logined;
export const { login, logout } = Logined.actions;
