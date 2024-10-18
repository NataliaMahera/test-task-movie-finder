import MovieDetails from "../components/MovieDetails";
import ScrollUpBtn from "../components/ScrollUpBtn";

const MovieDetailsPage: React.FC = () => {
  return (
    <section className="my-8 px-8 w-full">
      <MovieDetails />
      <ScrollUpBtn/>
    </section>
  );
};

export default MovieDetailsPage;
