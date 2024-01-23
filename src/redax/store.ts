import { configureStore } from '@reduxjs/toolkit';
import department from './slices/departmentSlice';
import auth from './slices/authSlice';
import user from './slices/userSlice';
import formValidetion from './slices/formValidetionSlice';
import messageError from './slices/messageErrorSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { department, formValidetion, auth, user, messageError },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
