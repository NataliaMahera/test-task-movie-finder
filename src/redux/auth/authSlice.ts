import { createSlice } from '@reduxjs/toolkit';
import { User, UserState } from './auth.types';
import { toast } from 'react-toastify';
import { styleToastify } from '../../components/Toster';

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
      const userExists = registeredUsers.some(user => user.email === payload.email);

      if (userExists) {
        toast.error('User with this email is already registered.', styleToastify);
        return;
      }

      registeredUsers.push(payload);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      state.isLoggedIn = true;
      state.user = payload;
      toast.success('Registration successful!', styleToastify);
    },
    login: (state, { payload }) => {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = registeredUsers.find(
        (user) => user.email === payload.email && user.password === payload.password
      );

      if (userExists) {
        state.isLoggedIn = true;
        state.user = userExists;
        toast.success('Login successful!', styleToastify);
      } else {
        state.isLoggedIn = false;
        state.user = null;
        toast.error('User not found. Please check your credentials.', styleToastify);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      toast.success('You have been logged out.', styleToastify);
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
