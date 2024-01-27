import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from '../../utils/Auth';
import { User, UserAddProps } from '../types';
import { RootState } from '../store';

export const fetchAddUser = createAsyncThunk<User, UserAddProps>(
  'page/fetchAddUser',
  async (params) => {
    const { email, password, name, positionWork } = params;
    const data = await auth.addUser(email, password, name, positionWork);
    return data;
  }
);

export const fetchLoginUser = createAsyncThunk<
  { token: string },
  Pick<UserAddProps, 'email' | 'password'>
>('page/fetchLoginUser', async (params) => {
  const { email, password } = params;
  const data = await auth.loginUser(email, password);
  return data;
});

const initialState: { token: string | null } = {
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    killAllStateAuth(state) {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddUser.pending, () => {
      //console.log('запрос на регистрацию');
    });
    builder.addCase(fetchAddUser.fulfilled, () => {
      //console.log(payload);
    });
    builder.addCase(fetchAddUser.rejected, () => {
      console.log('ошибка регистрации');
    });

    builder.addCase(fetchLoginUser.pending, () => {
      //console.log('запрос на авторизацию');
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
      //console.log(payload.token);
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
    });
    builder.addCase(fetchLoginUser.rejected, () => {
      console.log('ошибка авторизации');
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { killAllStateAuth } = authSlice.actions;
export default authSlice.reducer;
