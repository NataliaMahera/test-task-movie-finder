import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
