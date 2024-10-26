import {
  ErrorDetails,
  MoviesState,
  Genre,
  MoviesResponse,
} from './movies.types';

export const handlePending = (state: MoviesState) => {
  state.isLoading = true;
};

export const handleFulfilledGetPopular = (
  state: MoviesState,
  { payload }: { payload: MoviesResponse }
) => {
  state.isLoading = false;
  state.error = null;
  const existingIds = new Set(state.popularMovies.map((movie) => movie.id));
  // фільтрації на основі поточного стану
  const newMovies = payload.results.filter(
    (movie) => !existingIds.has(movie.id)
  );
  state.popularMovies = [...state.popularMovies, ...newMovies];
  state.totalPages = payload.total_pages;
};

export const handleFulfilledGetGenres = (
  state: MoviesState,
  { payload }: { payload: Genre[] }
) => {
  state.genres = payload;
};

export const handleFulfilledSearchMovies = (
  state: MoviesState,
  { payload }: { payload: MoviesResponse }
) => {
  state.isLoading = false;
  state.error = null;
  state.totalPages = payload.total_pages;
  state.searchResults = [...state.searchResults, ...payload.results];
};

export const handleRejected = (
  state: MoviesState,
  { payload }: { payload?: ErrorDetails }
) => {
  state.isLoading = false;
  state.error = payload ? { message: payload.message } : null;
};
