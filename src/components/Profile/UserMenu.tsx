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
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="flex items-center gap-4 bg-gray-300 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-700">Welcome, {user?.username}</h2>
    <button
      type="button"
      className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg transition duration-300 ease-in-out transform focus:outline-none"
      onClick={handleLogout}
    >
      <FiLogOut className="w-5 h-5" />
      Log out
    </button>
  </div>
  );
};

export default UserMenu;
