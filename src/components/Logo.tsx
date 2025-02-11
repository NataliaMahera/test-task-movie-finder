import { SiThemoviedatabase } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link aria-label='Go Home' to="/" className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105">
      <SiThemoviedatabase size={60} className='text-blue-800' />
    </Link>
  );
};

export default Logo;

