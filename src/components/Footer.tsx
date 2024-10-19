import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="p-8 border-t-[1px] border-gray-600 min-h-[100px]">
      <div className="text-center">
        {' '}
        &#169; Movie Finder 2024 | Developed by{' '}
        <Link
          className="font-semibold transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline "
          to="https://github.com/NataliaMahera"
          target="_blank"
        >
          Natalia Mahera
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
