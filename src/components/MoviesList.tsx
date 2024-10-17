import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import {
  getGenres,
  getPopularMovies,
  searchMovies,
} from '../redux/movies/moviesApi';
import { Loader } from './Loader';
import SearchBar from './SearchBar';
import MovieItem from './MovieItem';
import { clearMovies } from '../redux/movies/moviesSlice';
import PaginationButton from './PaginationButton';

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, searchResults, isLoading, error, totalPages } =
    useSelector((state: RootState) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page: currentPage }));
    } else {
      dispatch(getPopularMovies(currentPage));
      dispatch(getGenres());
    }

    return () => {
      if (searchQuery.trim()) {
        dispatch(clearMovies());
      }
    };
  }, [searchQuery, dispatch, currentPage]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const resetMovies = () => {
    setSearchQuery('');
    setCurrentPage(1);
    dispatch(clearMovies());
    dispatch(getPopularMovies(1));
  };

  const showLoadMore =
    (searchQuery ? searchResults.length : popularMovies.length) >= 20 &&
    currentPage < totalPages;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between md:gap-80">
        <h1 className="sm:text-5xl text-3xl font-bold mb-4">What to Watch</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetMovies={resetMovies}
        />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <h2 className="sm:text-2xl text-xl font-semibold text-left mb-4 uppercase">
        {searchQuery ? 'Search Results' : 'MOST POPULAR'}
      </h2>
      {isLoading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
        {(searchQuery ? searchResults : popularMovies).map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </ul>

      {showLoadMore && !isLoading && !error && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          handleLoadMore={handleLoadMore}
        />
      )}
      {searchQuery && searchResults.length === 0 && !isLoading && !error && (
        <div className="text-center h-80vh mt-8">
          <p className="text-gray-500 text-xl">
            No results found for "{searchQuery}". Please try another search
            term.
          </p>
        </div>
      )}
    </>
  );
};

export default MovieList;
