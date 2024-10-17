interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  handleLoadMore: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ currentPage, totalPages, handleLoadMore }) => {
  return (
     <div className="flex justify-center mt-6">
     <button
       type="button"
       onClick={handleLoadMore}
       aria-label="Load more button"
       disabled={currentPage >= totalPages}
       className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
     >
       Load More
     </button>
   </div>
  );
};

export default PaginationButton;
