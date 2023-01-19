import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const GameInfo = createSlice({
  name: "games",
  initialState,
  reducers: {
    games: (state, actions) => {
      console.log(actions.payload);
      state.values = actions.payload;
    },
  },
});

export default GameInfo;
export const { games } = GameInfo.actions;
