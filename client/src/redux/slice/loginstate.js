import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("key");
const id = localStorage.getItem("memberId");
const initialState = {
  isLogin: !!token,
  accessToken: token,
  memberId: id,
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
