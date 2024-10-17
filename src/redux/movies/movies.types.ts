export interface ErrorDetails {
  message: string;
  code?: number;
}

export interface ErrorResponse {
  message: string;
}

export interface Movie {
  length: number;
  id: number;
  title: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  getGenreNames: (genreIds: number[]) => string;
  original_title: string;
  backdrop_path: string;
  production_companies: ProductionCompany[];
  genres: Genre[];
  budget: number;
  revenue: number;
  runtime: number;
  tagline: string;
  homepage: string;
  imdb_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesAndGenresResponse {
  movies: Movie[];
  genres: Genre[];
}

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export interface MoviesState {
  popularMovies: Movie[];
  searchResults: Movie[];
  genres: Genre[];
  isLoading: boolean;
  error: ErrorDetails | null;
  totalPages: number;
  movieDetails: Movie | null; 
  recommendations: Movie[]
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
