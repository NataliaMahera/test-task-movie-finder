// src/pages/Favorites.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MovieItem from '../components/MovieItem';

const Favorites: React.FC = () => {
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
      {favoriteItems.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteItems.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;

