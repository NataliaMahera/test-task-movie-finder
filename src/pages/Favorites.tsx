import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MovieItem from '../components/MovieItem';
import ScrollUpBtn from '../components/ScrollUpBtn';

const Favorites: React.FC = () => {
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);

  return (
    <section className="my-8 px-4 sm:px-10 w-full">
      <h1 className="sm:text-4xl break-words w-[320px] text-3xl font-bold mb-4">
        Favorite Movies
      </h1>
      <hr className="border-t border-gray-300 mb-14" />
      {favoriteItems.length === 0 ? (
        <p className="text-gray-400 text-center text-xl">💁Add the movie to your favorite list.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {favoriteItems.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </ul>
      )}
      <ScrollUpBtn/>
    </section>
  );
};

export default Favorites;
