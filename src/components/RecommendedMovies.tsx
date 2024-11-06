import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../redux/movies/movies.types';
import { getMovieRecommendations } from '../services/themoviedbAPI';
import { Loader } from './Loader';
import defaultImg from '../assets/default-img.jpg';
import FavoriteButton from './FavoriteButton';
import InfiniteScroll from './InfiniteScroll';
import { parseAsInteger, useQueryState } from 'nuqs';

interface RecommendedMoviesProps {
  movieId: string | undefined;
  onSelectMovie: (id: string) => void;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  movieId,
  onSelectMovie,
}) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();
  
  const topObserverRef = useRef<HTMLDivElement | null>(null);
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieRecommendations(movieId, currentPage);
        if (currentPage === 1) {
          setRecommendations(data.results);
        } else {
          setRecommendations((prev) => [...prev, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId, currentPage]);

  const handleSelectMovie = (id: string) => {
    onSelectMovie(id);
    navigate(`/movie/${id}`);
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-10 px-4 sm:px-10">
      {isLoading && <Loader />}
      <h3 className="text-2xl sm:text-3xl font-semibold uppercase mb-6">
        Recommended Movies
      </h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-10">
        {recommendations.length > 0 ? (
          recommendations.map((movie, idx) => (
            <li
              key={`${movie.id}-${idx}`}
              onClick={() => handleSelectMovie(movie.id.toString())}
              className="bg-gray-700 md:min-h-[300px] min-h-[200px]  rounded-lg shadow-lg p-2 cursor-pointer relative transition-all duration-300 ease-in-out hover:scale-105"
            >
              <FavoriteButton movie={movie} />

              <img
                className="aspect-[2/3] rounded-lg mb-2"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
                width="500"
                height="750"
                loading="lazy"
              />

              <h4 className="text-lg font-semibold">{movie.title}</h4>
              <p className="text-sm text-gray-400">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : 'unknown'}
              </p>
            </li>
          ))
        ) : (
          <li className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 text-center p-4">
            <p className="text-gray-400 text-xl">
              Unfortunately, there are no recommended movies.
            </p>
          </li>
        )}
      </ul>
      
        <InfiniteScroll
        topObserverRef={topObserverRef}
        bottomObserverRef={bottomObserverRef}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RecommendedMovies;
