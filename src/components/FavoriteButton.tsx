import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../redux/favorites/favoritesSlice';
import { RootState } from '../redux/store';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Movie } from '../redux/movies/movies.types';

export type FavoriteMovie = Pick<
  Movie,
  'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average' | 'genre_ids'
>;
interface FavoriteButtonProps {
  movie: FavoriteMovie;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);

  const isFavorite = favoriteItems.some((favMovie) => favMovie.id === movie.id);

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(deleteFromFavorites({ id: movie.id }));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <button
      type="button"
      aria-label='Add Favorite'
      onClick={handleToggleFavorite}
      className="absolute top-2 right-2 z-10 p-2 transition-all duration-300 ease-in-out"
    >
      {isFavorite ? (
        <AiFillStar
          size={40}
          className="text-yellow-500 scale-125 transition-all duration-300 ease-in-out"
        />
      ) : (
        <AiOutlineStar
          size={40}
          className="transition-all scale-100 duration-300 ease-in-out"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
