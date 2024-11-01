import React, { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollUpBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-16 right-5 transition-all duration-300 ease-in-out z-30 rounded-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:shadow-xl' 
      ${ isVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'}`}
      aria-label="Scroll to top"
    >
      <AiOutlineArrowUp size={24} />
    </button>
  );
};

export default ScrollUpBtn;
