import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    accessToken: null,
    memberId: null,
    isLogin: false,
  },
};

const Logined = createSlice({
  name: 'logined',
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state, action) => {
      state.login = action.payload;
    },
  },
});
export default Logined;
export const { login, logout } = Logined.actions;
