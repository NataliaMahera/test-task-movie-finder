import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../assets/default-img.jpg';
import FavoriteButton, { FavoriteMovie } from './FavoriteButton'; // Імпортуємо універсальну кнопку

const MovieItem: React.FC<FavoriteMovie> = ({
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
    <li
      onClick={handleClick}
      className="relative aspect-[2/3.5] cursor-pointer border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImg
        }
        alt={title}
        className=" mb-2 h-auto transition-opacity duration-300 ease-in-out"
      />
      
      <FavoriteButton movie={{ id, title, genre_ids, release_date, vote_average, poster_path }} />
        <p className="text-gray-300 px-2 py-3  text-sm sm:text-base text-center break-words max-w-full">
          <strong className='text-gray-400 uppercase'>Genre:</strong>{' '}
          {genre_ids && genre_ids.length > 0
            ? getGenreNames(genre_ids)
            : 'not found'}
        </p>
      {/* Additional info when hovering */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 p-2">
        <h3 className="font-bold text-lg sm:text-xl text-white text-center break-words max-w-full">
          {title}
        </h3>
        <p className="text-white text-sm sm:text-base text-center">
          <strong>Release:</strong>{' '}
          {release_date ? new Date(release_date).getFullYear() : 'unknown'}
        </p>
        <p className="text-white text-sm sm:text-base text-center">
          <strong>Rating:</strong>{' '}
          {vote_average ? vote_average.toFixed(1) : 'N/A'} / 10
        </p>
      </div>
    </li>
  );
};

export default MovieItem;
