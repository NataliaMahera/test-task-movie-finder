import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Movie } from '../redux/movies/movies.types';
import { useNavigate } from 'react-router-dom';

const MovieItem: React.FC<Movie> = ({
  id,
  title,
  genre_ids,
  release_date,
  vote_average,
  poster_path,
}) => {
  const { genres } = useSelector((state: RootState) => state.movies);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const getGenreNames = (genreIds: number[]) =>
    genres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name)
      .join(', ');
  return (
    <li onClick={handleClick}
      key={id}
      className="relative aspect-[3/4] cursor-pointer border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        className="w-full h-auto transition-opacity duration-300 ease-in-out"
      />
      {/* Додаткова інформація при ховері */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 p-2">
        <h4 className="font-bold text-lg sm:text-xl text-white text-center break-words max-w-full">
          {title}
        </h4>
        <p className="text-white text-sm sm:text-base text-center break-words max-w-full">
          <strong>Genres:</strong> {genres ? getGenreNames(genre_ids) : "not found"}
        </p>
        <p className="text-white text-sm sm:text-base text-center">
          <strong>Release:</strong> {new Date(release_date).getFullYear()}
        </p>
        <p className="text-white text-sm sm:text-base text-center">
          <strong>Rating:</strong> {Math.round(vote_average)}
        </p>
      </div>
    </li>
  );
};

export default MovieItem;
