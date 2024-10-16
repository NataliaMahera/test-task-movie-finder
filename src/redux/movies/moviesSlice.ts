import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { MoviesState } from './movies.types';
import { getGenres, getPopularMovies } from './moviesApi';
import {
    handleFulfilledGetGenres,
  handleFulfilledGetPopular,
  handlePending,
  handleRejected,
} from './moviesFunctions';

const initialState: MoviesState = {
  movieItems: [],
  genres: [],
  isLoading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.fulfilled, handleFulfilledGetPopular)
      .addCase(getGenres.fulfilled, handleFulfilledGetGenres)
      .addMatcher(isPending(getPopularMovies), handlePending)
      .addMatcher(isRejected(getPopularMovies), handleRejected);
  },
  reducers: {},
});

export default moviesSlice.reducer;
