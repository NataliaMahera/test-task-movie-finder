import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface FavoriteIconProps {
  isFavorite: boolean;
  onToggle: (event: React.MouseEvent) => void;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ isFavorite, onToggle }) => {
  return (
    <button className='absolute top-2 right-2 z-10 p-2' onClick={onToggle}>
      {isFavorite ? <AiFillStar size={50} className="text-yellow-500" /> : <AiOutlineStar size={40}/>}
    </button>
  );
};

export default FavoriteIcon;
