export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
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
    original_title: string;
    backdrop_path: string;
    genres: Genre[];
    budget: number;
    revenue: number;
    runtime: number;
    tagline: string;
    homepage: string;
    imdb_id: string;
    production_companies: ProductionCompany[];
    getGenreNames: (genreIds: number[]) => string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
