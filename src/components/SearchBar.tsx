import { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Пакет для іконок
import { FiSearch } from 'react-icons/fi';
import { debounce } from 'lodash';
interface SearchBarProps {
  searchQuery: string;
  setQuery: (query: string) => void;
  clearMovies: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setQuery,
  clearMovies
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedSetSearchQuery = debounce((value: string) => {
    setQuery(value);
  }, 1000);

  useEffect(() => {
    if (inputValue) {
      debouncedSetSearchQuery(inputValue);
    } else {
      setQuery('');
    }

    return () => debouncedSetSearchQuery.cancel();
  }, [debouncedSetSearchQuery, inputValue, setQuery]);

  const handleReset = () => {
    setInputValue('');
    clearMovies()
  };

  return (
    <div className="relative mb-4 flex w-full sm:w-auto items-center">
      <FiSearch className="absolute left-3 top-4 text-gray-600" />
      <input
        type="text"
        placeholder="Search movies..."
        className="border text-lg pl-8 rounded-lg p-2 w-full lg:w-[650px] text-gray-800"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Reset input button */}
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
