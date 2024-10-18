import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/themoviedbAPI';
import { Loader } from '../components/Loader';
import { Movie } from '../redux/movies/movies.types';
import { BsArrowLeft } from 'react-icons/bs';
import RecommendedMovies from './RecommendedMovies';
import defaultImg from '../assets/default-img.jpg';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../redux/favorites/favoritesSlice';
import FavoriteIcon from './FavoriteBtn';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

const MovieDetails: React.FC = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  const dispatch = useDispatch<AppDispatch>();
  const { movieId } = useParams();
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFavorite =
    movie && favoriteItems.some((favMovie) => favMovie.id === movie.id);

  const handleToggleFavorite = () => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(deleteFromFavorites({ id: movie.id }));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

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
    if (!movieId) return;
    fetchSelectedMovie(movieId);
  }, [location.state?.prevMovieId, movieId]);

  const handleSelectRecommendedMovie = (id: string) => {
    if (!id) return;
    setMovie(null);
    setLoading(true);
    fetchSelectedMovie(id);
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (!movie) return null;
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
    budget,
    revenue,
    production_companies,
    runtime,
    tagline,
    homepage,
    imdb_id,
  } = movie;

  return (
    <>
      <h1 className="sm:text-4xl break-words w-[320px] text-3xl font-bold mb-4">
        Movie Details
      </h1>
      <hr className="border-t border-gray-300 mb-4" />
      <Link
        to={backLinkRef.current}
        className="mb-4 inline-flex items-center text-indigo-500 text-xl font-medium hover:underline hover:text-blue-400 transition-all duration-300 ease-in-out bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
      >
        <BsArrowLeft className="mr-2" /> Go Back
      </Link>
      <div className="bg-gray-900 text-white min-h-screen">
        {isLoading && <Loader />}
        {/* Backdrop */}
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
              {title}
            </h2>
          </div>
        </div>

        {/* Movie Content */}
        <div className={movie.length === 0 ? 'h-[74vh]' : 'mx-auto p-4 sm:p-6'}>
          <div className="flex flex-col lg:flex-row mt-6 lg:space-x-10">
            {/* Poster */}
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
              <div className="relative">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : defaultImg
                  }
                  alt={movie.title}
                />
                <FavoriteIcon
                  isFavorite={isFavorite}
                  onToggle={handleToggleFavorite}
                />
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold">
                {title} (
                {release_date
                  ? new Date(release_date).getFullYear()
                  : 'unknown'}
                )
              </h2>
              <p className="italic text-lg text-gray-400">{tagline}</p>
              <p className="mt-4 text-base md:text-lg">{overview}</p>

              {/* Genres */}
              <h3 className="text-xl font-semibold mt-6">Genres</h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="bg-indigo-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre && genre.name.length > 0 ? genre.name : 'not found'}
                  </li>
                ))}
              </ul>

              {/* Additional Info */}
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <li>
                  <h3 className="font-semibold">Runtime</h3>
                  <p>{runtime} minutes</p>
                </li>
                <li>
                  <h3 className="font-semibold">Budget</h3>
                  <p>${budget.toLocaleString()}</p>
                </li>
                <li>
                  <h3 className="font-semibold">Revenue</h3>
                  <p>${revenue.toLocaleString()}</p>
                </li>
                <li>
                  <h3 className="font-semibold">Rating</h3>
                  <p>{vote_average ? vote_average.toFixed(1) : 'N/A'} / 10</p>
                </li>
              </ul>

              {/* Production Companies */}
              <h3 className="text-xl font-semibold mt-6">
                Production Companies
              </h3>
              <ul className="mt-2 flex flex-wrap gap-4">
                {production_companies.map((company) => (
                  <li key={company.id} className="flex items-center gap-2">
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="w-16"
                      />
                    )}
                    <span>{company.name}</span>
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-center"
                  >
                    Official Website
                  </a>
                )}
                {imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white text-center"
                  >
                    View on IMDb
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Movies */}
          <RecommendedMovies
            movieId={movieId}
            onSelectMovie={handleSelectRecommendedMovie}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
