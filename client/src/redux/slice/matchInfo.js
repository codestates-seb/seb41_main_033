import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const GameInfo = createSlice({
  name: "games",
  initialState,
  reducers: {
    gameInfo: (state, actions) => {
      state.gameInfo = actions.payload;
    },
  },
});

export default GameInfo;
export const { gameInfo } = GameInfo.actions;
