import React, { useEffect, useRef } from 'react';
import { Loader } from './Loader';

interface InfiniteScrollProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading,
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        setCurrentPage((prevPage) =>
          prevPage < totalPages ? prevPage + 1 : prevPage
        );
      }
    };

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [currentPage, isLoading, setCurrentPage, totalPages]);

  return (
    <div>
      <div ref={observerRef} />
      {isLoading && <Loader fixed={false} />}
    </div>
  );
};

export default InfiniteScroll;
