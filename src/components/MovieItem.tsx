// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store';
// import { Movie } from '../redux/movies/movies.types';
// import { useNavigate } from 'react-router-dom';
// import defaultImg from '../assets/default-img.jpg';
// import { addToFavorites, deleteFromFavorites } from '../redux/favorites/favoritesSlice';
// import FavoriteIcon from './FavoriteBtn';

// const MovieItem: React.FC<Movie> = ({
//   id,
//   title,
//   genre_ids,
//   release_date,
//   vote_average,
//   poster_path,
// }) => {
//   const { genres } = useSelector((state: RootState) => state.movies);
//   const { favoriteItems } = useSelector((state: RootState) => state.favorites);
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   const isFavorite = favoriteItems.some((movie) => movie.id === id);

//   const handleToggleFavorite = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     if (isFavorite) {
//       dispatch(deleteFromFavorites({ id }));
//     } else {
//       dispatch(addToFavorites({ id, title, genre_ids, release_date, vote_average, poster_path }));
//     }
//   };

//   const handleClick = () => {
//     navigate(`/movie/${id}`);
//   };

//   const getGenreNames = (genreIds: number[]) =>
//     genres
//       .filter((genre) => genreIds.includes(genre.id))
//       .map((genre) => genre.name)
//       .join(', ');

//   return (
//     <li
//       onClick={handleClick}
//       className="relative aspect-[3/4] cursor-pointer border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
//     >
//       <img
//         src={
//           poster_path
//             ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//             : defaultImg
//         }
//         alt={title}
//         className="w-full h-auto transition-opacity duration-300 ease-in-out"
//       />
//           <FavoriteIcon isFavorite={isFavorite} onToggle={handleToggleFavorite} />
//       {/* Additional information when hovering card */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 p-2">
//         <h4 className="font-bold text-lg sm:text-xl text-white text-center break-words max-w-full">
//           {title}
//         </h4>
//         <p className="text-white text-sm sm:text-base text-center break-words max-w-full">
//           <strong>Genres:</strong>{' '}
//           {genre_ids && genre_ids.length > 0
//             ? getGenreNames(genre_ids)
//             : 'not found'}
//         </p>
//         <p className="text-white text-sm sm:text-base text-center">
//           <strong>Release:</strong>{' '}
//           {release_date ? new Date(release_date).getFullYear() : 'unknown'}
//         </p>
//         <p className="text-white text-sm sm:text-base text-center">
//           <strong>Rating:</strong>{' '}
//           {vote_average ? vote_average.toFixed(1) : 'N/A'} / 10
//         </p>
       
//       </div>
//     </li>
//   );
// };

// export default MovieItem;
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
      className="relative aspect-[3/4] cursor-pointer border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImg
        }
        alt={title}
        className="w-full h-auto transition-opacity duration-300 ease-in-out"
      />
      
      {/* Використання компонента FavoriteButton */}
      <FavoriteButton movie={{ id, title, genre_ids, release_date, vote_average, poster_path }} />

      {/* Додаткова інформація при наведенні курсору на картку */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 p-2">
        <h4 className="font-bold text-lg sm:text-xl text-white text-center break-words max-w-full">
          {title}
        </h4>
        <p className="text-white text-sm sm:text-base text-center break-words max-w-full">
          <strong>Genres:</strong>{' '}
          {genre_ids && genre_ids.length > 0
            ? getGenreNames(genre_ids)
            : 'not found'}
        </p>
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
