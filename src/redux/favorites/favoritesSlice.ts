import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../movies/movies.types';

export interface FavoritesState {
  favoriteItems: Movie[];
}

const initialState: FavoritesState = {
  favoriteItems: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      state.favoriteItems.push(payload);
    },
    deleteFromFavorites: (state, { payload }) => {
      state.favoriteItems = state.favoriteItems.filter(
        ({ id }) => id !== payload.id
      );
    },
  },
});

export const { addToFavorites, deleteFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
