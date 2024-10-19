import FavoriteButton from './FavoriteButton';
import defaultImg from '../assets/default-img.jpg';
import { Movie } from '../redux/movies/movies.types';

interface MovieContentProps {
  movie: Movie;
}

const MovieContent: React.FC<MovieContentProps> = ({ movie }) => {
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
    
      <div className="bg-gray-700 text-white w-full min-h-screen">
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
        <div className={movie.length === 0 ? 'h-[74vh]' : 'mx-auto px-4 sm:px-10'}>
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
                 <FavoriteButton movie={movie} />
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
        </div>
      </div>
    </>
  );
};

export default MovieContent;
