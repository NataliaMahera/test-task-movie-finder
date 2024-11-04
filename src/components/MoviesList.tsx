import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { clearMovies } from '../redux/movies/moviesSlice';
import {
  getGenres,
  getPopularMovies,
  searchMovies,
} from '../redux/movies/moviesApi';
import { Loader } from './Loader';
import SearchBar from './SearchBar';
import MovieItem from './MovieItem';
import InfiniteScroll from './InfiniteScroll';

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { popularMovies, searchResults, isLoading, error, totalPages } =
    useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page: currentPage }));
    } else {
      dispatch(getPopularMovies(currentPage));
      dispatch(getGenres());
    }
  }, [currentPage, dispatch, setCurrentPage, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(clearMovies());
    }
  }, [searchQuery, dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h1 className="flex break-words min-w-[300px] text-3xl font-bold mb-4">
          What to Watch
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          setQuery={setSearchQuery}
          setPage={setCurrentPage}
        />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <h2 className="sm:text-2xl text-xl font-semibold text-left mb-4 uppercase">
        {searchQuery ? 'Search Results' : 'MOST POPULAR'}
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-10">
        {(searchQuery ? searchResults : popularMovies).map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </ul>
      {searchQuery && searchResults.length === 0 && !isLoading && !error && (
        <div className="text-center h-80vh mt-8">
          <p className="text-gray-400 text-xl">
            No results found for "{searchQuery}". Please try another search
            term.
          </p>
        </div>
      )}

      <InfiniteScroll
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </>
  );
};

export default MovieList;
