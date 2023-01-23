import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const UserInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, actions) => {
      state.userInfo = actions.payload;
    },
  },
});

export default UserInfo;
export const { userInfo } = UserInfo.actions;
