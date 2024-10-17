import React, { useEffect, useState } from 'react';
import { Movie } from '../redux/movies/movies.types';
import { getMovieRecommendations } from '../services/themoviedbAPI'; // Імпорт функції для отримання рекомендацій
import PaginationButton from './PaginationButton';
import { Loader } from './Loader';

interface RecommendedMoviesProps {
  movieId: string | undefined;
  defaultImg: string;
  onSelectMovie: (id: string) => void;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  movieId,
  defaultImg,
  onSelectMovie,
}) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  const showLoadMore = recommendations.length >= 20 && currentPage < totalPages;

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-10">
      {isLoading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-6">Recommended Movies</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((recMovie) => (
          <li
            key={recMovie.id}
            onClick={() => onSelectMovie(recMovie.id.toString())}
            className="bg-gray-800 rounded-lg shadow-lg p-2 cursor-pointer"
          >
            <img
              className="w-full rounded-lg mb-2"
              src={
                recMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${recMovie.poster_path}`
                  : defaultImg
              }
              alt={recMovie.title}
            />
            <h4 className="text-lg font-semibold">{recMovie.title}</h4>
            <p className="text-sm text-gray-400">
              {recMovie.release_date.slice(0, 4)}
            </p>
          </li>
        ))}
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
