import { Movie } from "../types/types";

export const updateUniqueMovies = (
    newMovies: Movie[],
    prevMovies: Movie[]
  ): Movie[] => {
    const existingIds = new Set(prevMovies.map((movie) => movie.id));
    const uniqueMovies = newMovies.filter(
      (movie) => !existingIds.has(movie.id)
    );
    return [...prevMovies, ...uniqueMovies];
  };