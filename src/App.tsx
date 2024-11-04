import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader } from './components/Loader';
import { styleToastify } from './components/Toster';
import Layout from './components/Layout';
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
      <ToastContainer {...styleToastify}/>
    </Layout>
  );
}

export default App;
