import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const PrivateRoutes: React.FC<{
  children: React.ReactNode;
  navigateTo?: string;
}> = ({ children, navigateTo = '/' }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? children : <Navigate to={navigateTo} replace />;
};

export default PrivateRoutes;
