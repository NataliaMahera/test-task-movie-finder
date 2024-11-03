import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Logo from './Logo';
import AuthControl from './Profile/AuthControl';

const Header: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <header className="md:fixed top-0 left-0 z-20 w-full px-2 sm:px-8 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg flex justify-center items-center">
      <Logo />
      <nav className="max-w-5xl mx-auto px-6 py-8">
        <ul className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-1 sm:space-x-10">
          <li className='min-w-[90px] sm:min-w-[150px]'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm sm:text-2xl font-semibold transition-all duration-300 ease-in-out 
              ${ isActive
                    ? 'text-yellow-300 font-bold border-b-2 border-yellow-300 pointer-events-none'
                    : 'text-white hover:text-yellow-300'
                }`
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
                  `text-sm sm:text-2xl font-semibold transition-all duration-300 ease-in-out 
                ${ isActive
                      ? 'text-yellow-300 font-bold border-b-2 border-yellow-300 pointer-events-none'
                      : 'text-white hover:text-yellow-300'
                  }`
                }
              >
                Favorites
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      <AuthControl/>
    </header>
  );
};

export default Header;
