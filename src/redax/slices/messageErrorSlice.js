import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
};

const messageErrorSlice = createSlice({
  name: 'messageError',
  initialState,
  reducers: {
    killAllStateMessageError(state) {
      state.error = false;
    },
    isError(state, action) {
      state.error = action.payload;
    },
  },
});

export const selectMessageError = (state) => state.messageError;

export const { killAllStateMessageError, isError } = messageErrorSlice.actions;
export default messageErrorSlice.reducer;
