import { useCallback, useEffect, useState } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
  getGenres,
  getPopularMovies,
  getSearchMovies,
} from '../services/themoviedbAPI';
import SearchBar from './SearchBar';
import MovieItem from './MovieItem';
import InfiniteScroll from './InfiniteScroll';
import { Genre, Movie } from '../types/types';
import { updateUniqueMovies } from '../utils/arrayUtils';

const MovieList: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
  });
  const [currentSearchPage, setCurrentSearchPage] = useQueryState(
    'searchPage',
    parseAsInteger.withDefault(1)
  );
  const [totalSearchPages, setTotalSearchPages] = useState(0);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genresLoaded = genres && genres.length > 0;

  // Функція для завантаження фільмів (популярних чи пошукових)
  const loadMovies = async (page: number, addToTop: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (searchQuery.trim()) {
        const data = await getSearchMovies(searchQuery, page);
        setTotalSearchPages(data.total_pages);
        setSearchResults((prevResults) =>
          // addToTop
          //   ? updateUniqueMovies(data.results, prevResults)
          updateUniqueMovies(data.results, prevResults)
        );
      } else {
        const data = await getPopularMovies(page);
        setTotalPages(data.total_pages);
        setPopularMovies((prevMovies) =>
          // addToTop
          //   ? updateUniqueMovies(data.results, prevMovies)
          updateUniqueMovies(data.results, prevMovies)
        );
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // // зміна сторінки для підвантаження фільмів
  // const handlePageChange = (newPage: number, addToTop: boolean) => {
  //   loadMovies(newPage, addToTop);
  // };

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const clearMovies = useCallback(() => {
    setPopularMovies([]);
    setSearchResults([]);
    setCurrentPage(1);
    setCurrentSearchPage(1);
    setTotalPages(0);
    setTotalSearchPages(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      loadMovies(currentSearchPage, false); // Завантаження результатів пошуку
    } else {
      loadMovies(currentPage, false); // Завантаження популярних фільмів
    }

    if (!genresLoaded) {
      fetchGenres();
    }
  }, [currentPage, currentSearchPage, searchQuery, genresLoaded]);

  useEffect(() => {
    if (searchQuery) {
      clearMovies();
    }
  }, [clearMovies, searchQuery]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h1 className="flex break-words min-w-[300px] text-3xl font-bold mb-4">
          What to Watch
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          setQuery={setSearchQuery}
          clearMovies={clearMovies}
        />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <h2 className="sm:text-2xl text-xl font-semibold text-left mb-4 uppercase">
        {searchQuery ? 'Search Results' : 'MOST POPULAR'}
      </h2>

      <InfiniteScroll
        currentPage={searchQuery ? currentSearchPage : currentPage}
        totalPages={searchQuery ? totalSearchPages : totalPages}
        setCurrentPage={searchQuery ? setCurrentSearchPage : setCurrentPage}
        isLoading={isLoading}
        isTop={true}
        // onPageChange={handlePageChange}
      />

      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-10">
        {(searchQuery ? searchResults : popularMovies).map((movie) => {
          return <MovieItem key={movie.id} {...movie} genres={genres} />;
        })}
      </ul>

      <InfiniteScroll
        currentPage={searchQuery ? currentSearchPage : currentPage}
        totalPages={searchQuery ? totalSearchPages : totalPages}
        setCurrentPage={searchQuery ? setCurrentSearchPage : setCurrentPage}
        isLoading={isLoading}
        isTop={false}
        // onPageChange={handlePageChange}
      />

      {searchQuery && searchResults.length === 0 && !isLoading && !error && (
        <div className="text-center h-80vh mt-8">
          <p className="text-gray-400 text-xl">
            No results found for "{searchQuery}". Please try another search
            term.
          </p>
        </div>
      )}
    </>
  );
};

export default MovieList;
