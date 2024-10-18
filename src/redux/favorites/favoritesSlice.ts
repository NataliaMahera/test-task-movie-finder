import { createSlice } from '@reduxjs/toolkit'
import { Movie } from '../movies/movies.types';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export interface FavoritesState extends PersistPartial{
  favoriteItems: Movie[],
}

const initialState: FavoritesState = {
  favoriteItems: [],
  _persist: { version: -1, rehydrated: false }
}

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
})

export const {addToFavorites, deleteFromFavorites} = favoritesSlice.actions

export default favoritesSlice.reducer
