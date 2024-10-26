import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { MoviesState } from './movies.types';
import { getGenres, getPopularMovies, searchMovies } from './moviesApi';
import {
  handleFulfilledGetGenres,
  handleFulfilledGetPopular,
  handleFulfilledSearchMovies,
  handlePending,
  handleRejected,
} from './moviesFunctions';

const initialState: MoviesState = {
  popularMovies: [],
  searchResults: [],
  movieDetails: null,
  recommendations: [],
  genres: [],
  isLoading: false,
  error: null,
  totalPages: 0,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.fulfilled, handleFulfilledGetPopular)
      .addCase(getGenres.fulfilled, handleFulfilledGetGenres)
      .addCase(searchMovies.fulfilled, handleFulfilledSearchMovies)
      .addMatcher(isPending(getPopularMovies, searchMovies), handlePending)
      .addMatcher(isRejected(getPopularMovies, searchMovies), handleRejected);
  },
  reducers: {
    clearMovies: (state) => {
      state.popularMovies = [];
      state.searchResults = [];
      state.totalPages = 0;
      state.recommendations = [];
    },
  },
});

export const { clearMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
