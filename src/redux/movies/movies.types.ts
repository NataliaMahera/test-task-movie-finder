export interface ErrorDetails {
  message: string;
  code?: number;
}

export interface ErrorResponse {
  message: string;
}

export interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesAndGenresResponse {
  movies: Movie[];
  genres: Genre[];
}

export interface MoviesState {
  movieItems: Movie[];
  genres: Genre[];
  isLoading: boolean;
  error: ErrorDetails | null;
}
