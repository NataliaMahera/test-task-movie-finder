import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/auth/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md">
      <h2 className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-left">
        Welcome, {user?.username}
      </h2>
      <button
        type="button"
        className="flex justify-center items-center text-sm sm:text-lg gap-1 px-2 sm:px-4 py-1 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg transition duration-300 ease-in-out transform focus:outline-none w-full sm:w-auto"
        onClick={handleLogout}
      >
        <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
