import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/themoviedbAPI';
import { Loader } from '../components/Loader';
import { Movie } from '../redux/movies/movies.types';
import RecommendedMovies from './RecommendedMovies';
import MovieContent from './MovieDetailsContent';
import GoBackButton from './GoBackBtn';
import { useParams } from 'react-router-dom';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSelectedMovie = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchSelectedMovie(movieId);
    }
  }, [movieId]);

  const handleSelectRecommendedMovie = (id: string) => {
    if (!id) return;
    setMovie(null);
    setLoading(true);
    fetchSelectedMovie(id);
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!movie) return null;

  return (
    <>
      <div className="px-6">
        <h1 className="sm:text-4xl break-words w-[320px] text-3xl font-bold mb-4">
          Movie Details
        </h1>
        <hr className="border-t border-gray-300 mb-4" />
        <GoBackButton />
      </div>

      {isLoading ? <Loader /> : <MovieContent movie={movie} />}
      <RecommendedMovies
        movieId={movieId}
        onSelectMovie={handleSelectRecommendedMovie}
      />
    </>
  );
};

export default MovieDetails;
