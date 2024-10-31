import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './auth.types';

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
