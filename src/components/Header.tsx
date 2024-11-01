import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { RootState } from '../redux/store';
import Logo from './Logo';
import AuthNav from './Profile/AuthNav';
import UserMenu from './Profile/UserMenu';

const Header: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  return (
    <header className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg w-full flex justify-center items-center">
      <Logo />
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <ul className="flex justify-center space-x-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'text-sm sm:text-2xl font-semibold transition-all duration-300 ease-in-out',
                  isActive
                    ? 'text-yellow-300 font-bold border-b-2 border-yellow-300'
                    : 'text-white hover:text-yellow-300'
                )
              }
            >
              Watch Guide
            </NavLink>
          </li>
          <li>
            {isLoggedIn && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  clsx(
                    'text-sm sm:text-2xl font-semibold transition-all duration-300 ease-in-out',
                    isActive
                      ? 'text-yellow-300 font-bold border-b-2 border-yellow-300 pointer-events-none'
                      : 'text-white hover:text-yellow-300'
                  )
                }
              >
                Favorites
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default Header;
