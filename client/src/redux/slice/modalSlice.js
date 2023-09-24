import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: { isOpen: null, props: null },
  reducers: {
    setOpen: (state, action) => {
      const { isOpen, props } = action.payload;
      state.isOpen = isOpen;
      state.props = props;
    },
    setClose: (state) => {
      state.isOpen = null;
      state.props = null;
    },
  },
});

export default modalSlice;
export const { setOpen, setClose } = modalSlice.actions;
