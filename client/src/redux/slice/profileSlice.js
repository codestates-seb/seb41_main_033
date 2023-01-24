import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: { user: {} },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default profileSlice;
export const { setProfile } = profileSlice.actions;
