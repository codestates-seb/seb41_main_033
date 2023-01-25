import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
  name: 'blockSlice',
  initialState: { blockUsers: [] },
  reducers: {
    setBlock: (state, action) => {
      state.blockUsers = action.payload;
    },
  },
});

export default blockSlice;
export const { setBlock } = blockSlice.actions;
