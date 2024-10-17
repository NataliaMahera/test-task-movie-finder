import clsx from 'clsx';
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
      className={clsx(
        'fixed bottom-4 right-4 transition-all duration-300 ease-in-out bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700',
        {
          'opacity-100 visible translate-x-0': isVisible,
          'opacity-0 invisible translate-x-full': !isVisible,
        }
      )}
      aria-label="Scroll to top"
    >
      <AiOutlineArrowUp size={24} />
    </button>
  );
};

export default ScrollUpBtn;
