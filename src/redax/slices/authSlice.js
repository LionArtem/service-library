import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from '../../utils/Auth';

export const fetchAddUser = createAsyncThunk(
  'page/fetchAddUser',
  async (params, thunkAPI) => {
    const { email, password, name, positionWork } = params;
    const data = await auth.addUser(email, password, name, positionWork);
    return data;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'page/fetchLoginUser',
  async (params, thunkAPI) => {
    const { email, password } = params;
    const data = await auth.loginUser(email, password);
    return data;
  }
);

const initialState = {
  //fopmLogin: false,
  token: localStorage.getItem('token'),
  // showPreloader: false,
  // textArrAnswerServer: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // resetTextArrAnswerServer(state) {
    //   state.textArrAnswerServer = '';
    // },
    killAllStateAuth(state) {
      //state.fopmReg = false;
      // state.fopmSign = false;
      state.token = '';
      // state.showPreloader = false;
      // state.textArrAnswerServer = '';
    },
    // resetForm(state) {
    //   state.fopmReg = false;
    //   state.fopmSign = false;
    //   state.showPreloader = false;
    //   state.textArrAnswerServer = '';
    // },
    // setfopmLogin(state) {
    //   state.fopmSign = true;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.pending, (state) => {
      // state.showPreloader = true;
      console.log('запрос на регистрацию');
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      //console.log(payload);
    });
    builder.addCase(fetchAddUser.rejected, (state, action) => {
      console.log('ошибка регистрации');
      // state.textArrAnswerServer = action.error.message;
      // state.showPreloader = false;
    });

    builder.addCase(fetchLoginUser.pending, (state) => {
      //state.showPreloader = true;
      console.log('запрос на авторизацию');
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
      //console.log(payload.token);
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      // state.textArrAnswerServer = action.error.message;
      // state.showPreloader = false;
      console.log('ошибка авторизации');
    });
  },
});

export const selectAuth = (state) => state.auth;

export const {
  killAllStateAuth,
  resetTextArrAnswerServer,
  resetForm,
} = authSlice.actions;
export default authSlice.reducer;
