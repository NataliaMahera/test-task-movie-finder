import { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Пакет для іконок
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetMovies: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  resetMovies
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, setSearchQuery]);

  const handleReset = () => {
    setInputValue('');
    resetMovies();
  };

  return (
    <div className="relative mb-4 flex items-center">
      <FiSearch className="absolute left-3 top-4 text-gray-600" />
      <input
        type="text"
        placeholder="Search movies..."
        className="border text-lg pl-8 rounded-lg p-2 w-full sm:w-[650px] text-gray-800"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Кнопка скидання */}
      {inputValue && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 transition-transform duration-300 ease-in-out hover:scale-125"
        >
          <AiOutlineCloseCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
