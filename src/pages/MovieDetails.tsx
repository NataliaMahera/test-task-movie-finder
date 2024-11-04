import { lazy, Suspense } from 'react';
import ScrollUpBtn from '../components/ScrollUpBtn';
import { Loader } from '../components/Loader';

const MovieDetails = lazy(()=> import ('../components/MovieDetails'));

const MovieDetailsPage: React.FC = () => {
  return (
    <section className="my-8">
      <Suspense fallback={<Loader />}>
        <MovieDetails />
      </Suspense>
      <ScrollUpBtn />
    </section>
  );
};

export default MovieDetailsPage;
