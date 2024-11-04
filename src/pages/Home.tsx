import { lazy, Suspense } from 'react';
import ScrollUpBtn from '../components/ScrollUpBtn';
import { Loader } from '../components/Loader';

const MoviesList = lazy(() => import('../components/MoviesList'));

const Home: React.FC = () => {
  return (
    <section className="my-8 px-4 sm:px-10">
      <Suspense fallback={<Loader />}>
        <MoviesList />
      </Suspense>
      <ScrollUpBtn />
    </section>
  );
};

export default Home;
