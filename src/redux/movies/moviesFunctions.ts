import { ErrorDetails, MoviesState, Movie, Genre } from "./movies.types";

export const handlePending = (state: MoviesState) => {
    state.isLoading = true;
  };
  
  export const handleFulfilledGetPopular = (state: MoviesState, { payload }: { payload: Movie[]}) => {
    state.isLoading = false;
    state.error = null;
    state.movieItems = payload;
  };

  export const handleFulfilledGetGenres = (state: MoviesState, { payload }: { payload: Genre[] }) => {
    state.genres = payload;
  }

  export const handleRejected = (state: MoviesState, { payload }: { payload?: ErrorDetails } ) => {
    state.isLoading = false;
    state.error = payload ? { message: payload.message } : null;
  };