import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-4 inline-flex items-center text-indigo-500 text-xl font-medium hover:underline hover:text-blue-400 transition-all duration-300 ease-in-out bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
    >
      <BsArrowLeft className="mr-2" /> Go Back
    </button>
  );
};

export default GoBackButton;
