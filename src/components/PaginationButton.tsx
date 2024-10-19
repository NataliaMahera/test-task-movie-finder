import { AiOutlineArrowDown } from "react-icons/ai";

interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  handleLoadMore: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ currentPage, totalPages, handleLoadMore }) => {
  return (
    <div className="flex justify-center mt-12 mb-12">
      <button
        type="button"
        onClick={handleLoadMore}
        aria-label="Load more button"
        disabled={currentPage >= totalPages}
        className={`flex uppercase items-center justify-center gap-2 px-8 py-3 font-bold rounded-full shadow-lg transform transition-all duration-300 text-l
        ${
          currentPage >= totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:shadow-xl'
        }`}
      >
        <AiOutlineArrowDown size={24} />
        {currentPage >= totalPages ? 'No More Pages' : 'LOAD MORE'}
      </button>
    </div>
  );
};

export default PaginationButton;
