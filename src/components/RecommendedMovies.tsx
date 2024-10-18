import React, { useEffect, useState } from 'react';
import { Movie } from '../redux/movies/movies.types';
import { getMovieRecommendations } from '../services/themoviedbAPI'; 
import PaginationButton from './PaginationButton';
import { Loader } from './Loader';
import defaultImg from '../assets/default-img.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addToFavorites, deleteFromFavorites } from '../redux/favorites/favoritesSlice';
import FavoriteIcon from './FavoriteBtn';

interface RecommendedMoviesProps {
  movieId: string | undefined;
  onSelectMovie: (id: string) => void;
  movie: Movie;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  movieId,
  onSelectMovie,
}) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieRecommendations(movieId);
        setRecommendations((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleToggleFavorite = (event: React.MouseEvent, id: number, title: string, poster_path: string | null, release_date: string) => {
    event.stopPropagation();

    const isFavorite = favoriteItems.some((favMovie) => favMovie.id === id);

    if (isFavorite) {
      dispatch(deleteFromFavorites({ id }));
    } else {
      dispatch(addToFavorites({ id, title, poster_path, release_date }));
    }
  };

  const showLoadMore = recommendations.length >= 20 && currentPage < totalPages;

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-10">
      
      {isLoading && <Loader />}
      <h3 className="text-2xl sm:text-3xl font-semibold uppercase mb-6">Recommended Movies</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {recommendations.map(({ id, poster_path, title, release_date }, idx) => {
          const isFavorite = favoriteItems.some((favMovie) => favMovie.id === id); // Перевірка для кожного фільму

          return (
            <li
              key={`${id}-${idx}`}
              onClick={() => onSelectMovie(id.toString())}
              className="bg-gray-800 rounded-lg shadow-lg p-2 cursor-pointer relative transition-all duration-300 ease-in-out hover:scale-105"
            >
              <FavoriteIcon 
                isFavorite={isFavorite} 
                onToggle={(event) => handleToggleFavorite(event, id, title, poster_path, release_date)} 
              />
              <img
                className="w-full rounded-lg mb-2"
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : defaultImg
                }
                alt={title}
              />

              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-sm text-gray-400">
                {release_date ? new Date(release_date).getFullYear() : 'unknown'}
              </p>
            </li>
          );
        })}
      </ul>

      {showLoadMore && !isLoading && !error && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default RecommendedMovies;
