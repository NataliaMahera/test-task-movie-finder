import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import { Loader } from './components/Loader';
import PrivateRoutes from './routes/PrivateRoutes';

const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoutes>
                <Favorites />
              </PrivateRoutes>
            }
          />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <ToastContainer/>
    </Layout>
  );
}

export default App;
