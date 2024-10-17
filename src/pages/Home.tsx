import MoviesList from '../components/MoviesList';
import ScrollUpBtn from '../components/ScrollUpBtn';

const Home: React.FC = () => {
  return (
    <section className="my-8 px-8 w-full">
      <MoviesList />
      <ScrollUpBtn />
    </section>
  );
};

export default Home;
