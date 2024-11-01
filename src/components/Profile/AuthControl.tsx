import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserMenu from './UserMenu';
import AuthNav from './AuthNav';

const AuthControl = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? <UserMenu /> : <AuthNav />;
};

export default AuthControl;
