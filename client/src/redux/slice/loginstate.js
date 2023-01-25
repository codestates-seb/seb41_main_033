import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    memberId: null,
    isLogin: false,
    expire: null,
    refreshtoken: null,
  },
};

const Logined = createSlice({
  name: "logined",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state, action) => {
      state.login = action.payload;
    },
    quit: (state, action) => {
      state.login = action.payload;
    },
  },
});
export default Logined;
export const { login, logout, quit } = Logined.actions;
