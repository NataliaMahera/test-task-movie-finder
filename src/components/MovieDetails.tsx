import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/themoviedbAPI';
import { Loader } from '../components/Loader';
import { Movie } from '../redux/movies/movies.types';
import { BsArrowLeft } from 'react-icons/bs';
import RecommendedMovies from './RecommendedMovies';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchSelectedMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedMovie();
  }, [movieId]);

  const handleSelectMovie = (id: string) => {
    setMovie(null); 
    setLoading(true); 

    const fetchSelectedMovie = async () => {
      try {
        const data = await getMovieDetails(id); // Використовуємо id для отримання даних
        setMovie(data); // Отримуємо новий фільм
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); // Вимикаємо індикатор завантаження
      }
    };

    fetchSelectedMovie();
  }

  // Перевірка на помилку
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Перевірка на відсутність даних
  if (!movie) return null; // Тут повертаємо null, щоб нічого не показувати

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

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {isLoading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      {/* Backdrop */}
      <div
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
            {title}
          </h1>
        </div>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto p-4 sm:p-6">
        <Link
          to={backLinkRef.current}
          className="flex items-center text-blue-500 text-2xl hover:underline"
        >
          <BsArrowLeft className="mr-2" /> Go Back
        </Link>

        <div className="flex flex-col lg:flex-row mt-6 lg:space-x-10">
          {/* Poster */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <img
              className="w-full rounded-lg shadow-lg"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : defaultImg
              }
              alt={title}
            />
          </div>

          {/* Movie Details */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold">
              {title} ({release_date.slice(0, 4)})
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
                  {genre.name}
                </li>
              ))}
            </ul>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Runtime</h3>
                <p>{runtime} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold">Budget</h3>
                <p>${budget.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Revenue</h3>
                <p>${revenue.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{vote_average.toFixed(1)} / 10</p>
              </div>
            </div>

            {/* Production Companies */}
            <h3 className="text-xl font-semibold mt-6">Production Companies</h3>
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
        <RecommendedMovies movieId={movieId} defaultImg={defaultImg} onSelectMovie={handleSelectMovie} />
      </div>
    </div>
  );
};

export default MovieDetails;
