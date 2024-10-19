import MoviesList from '../components/MoviesList';
import ScrollUpBtn from '../components/ScrollUpBtn';

const Home: React.FC = () => {
  return (
    <section className="my-8 px-4 sm:px-10 w-full">
      <MoviesList />
      <ScrollUpBtn />
    </section>
  );
};

export default Home;
