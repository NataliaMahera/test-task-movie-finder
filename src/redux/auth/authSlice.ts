import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { User, UserState } from './auth.types';

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, { payload }) => {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const isUserExists = registeredUsers.some(user => user.email === payload.email);

      if (isUserExists) {
        toast.error('User with this email is already registered.');
        return;
      }

      registeredUsers.push(payload);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      state.isLoggedIn = true;
      state.user = payload;
      toast.success('Registration successful!');
    },
    login: (state, { payload }) => {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const isUserExists = registeredUsers.find(
        (user) => user.email === payload.email && user.password === payload.password
      );

      if (isUserExists) {
        state.isLoggedIn = true;
        state.user = isUserExists;
        toast.success('Login successful!');
      } else {
        state.isLoggedIn = false;
        state.user = null;
        toast.error('User not found. Please check your credentials.');
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      toast.info('You have been logged out.');
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
