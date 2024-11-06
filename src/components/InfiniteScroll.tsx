import React, { useEffect } from 'react';
import { Loader } from './Loader';

interface InfiniteScrollProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  topObserverRef: React.RefObject<HTMLDivElement>;
  bottomObserverRef: React.RefObject<HTMLDivElement>;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  totalPages,
  setCurrentPage,
  isLoading,
  currentPage,
  topObserverRef,
  bottomObserverRef,
}) => {
  useEffect(() => {
    const loadNextPage = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const loadPrevPage = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.25,
    };

    const bottomObserver = new IntersectionObserver(loadNextPage, options);
    const topObserver = new IntersectionObserver(loadPrevPage, options);

    const topRef = topObserverRef.current;
    const bottomRef = bottomObserverRef.current;

    if (bottomRef) {
      bottomObserver.observe(bottomRef);
    }
    if (topRef) {
      topObserver.observe(topRef);
    }

    return () => {
      if (bottomRef) bottomObserver.unobserve(bottomRef);
      if (topRef) topObserver.unobserve(topRef);
    };
  }, [
    bottomObserverRef,
    currentPage,
    isLoading,
    setCurrentPage,
    topObserverRef,
    totalPages,
  ]);

  return <>{isLoading && <Loader fixed={false} />}</>;
};

export default InfiniteScroll;
