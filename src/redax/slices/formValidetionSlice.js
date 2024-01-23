import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  errors: {},
  valid: false,
};

const formValidetionSlice = createSlice({
  name: 'formValidetion',
  initialState,
  reducers: {
    killAllStateFormValidetion(state) {
      state.value = {};
      state.errors = {};
      state.valid = false;
    },
    setValue(state, action) {
      const { value, name, errors, valid } = action.payload;
      function checkedStringGap(string) {
        const regex = /^((?!\s{2}).)*$/;
        const result = regex.test(string);
        return result;
      }
      let errMessage = errors;
      if (!checkedStringGap(value)) {
        errMessage = 'одного пробела достаточно!';
      }
      state.value = { ...state.value, [name]: value };
      state.errors = { ...state.errors, [name]: errMessage };
      state.valid = valid;
    },
    resetValues(state) {
      state.value = {};
    },
    setValid(state) {
      state.valid = false;
    },
  },
});

export const selectformValidetion = (state) => state.formValidetion;

export const { setValue, resetValues, setValid, killAllStateFormValidetion } =
  formValidetionSlice.actions;
export default formValidetionSlice.reducer;
