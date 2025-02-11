// import React, { useEffect, useRef } from 'react';
// import { Loader } from './Loader';

// interface InfiniteScrollProps {
//   currentPage: number;
//   totalPages: number;
//   isLoading: boolean;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   isTop?: boolean;
//   // onPageChange: (newPage: number, addToTop: boolean) => void;
// }

// const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
//   totalPages,
//   setCurrentPage,
//   isLoading,
//   currentPage,
//   isTop = false,
//   // onPageChange
// }) => {
//   const observerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleIntersect = (entries: IntersectionObserverEntry[]) => {
//       if (entries[0].isIntersecting && !isLoading) {
//         if (isTop && currentPage > 1) {
//           setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
//         } else if (!isTop && currentPage < totalPages) {
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//       }

//       // if (entries[0].isIntersecting && !isLoading) {
//       //   if (isTop && currentPage > 1) {
//       //     const newPage = currentPage - 1;
//       //     setCurrentPage(newPage);
//       //     onPageChange(newPage, true); // Завантаження зверху
//       //   } else if (!isTop && currentPage < totalPages) {
//       //     const newPage = currentPage + 1;
//       //     setCurrentPage(newPage);
//       //     onPageChange(newPage, false); // Завантаження знизу
//       //   }
//       // }
//     };

//     const options = {
//       root: null,
//       rootMargin: '50px',
//       threshold: 1,
//     };

//     const observer = new IntersectionObserver(handleIntersect, options);
//     const currentRef = observerRef.current;

//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [currentPage, isLoading, isTop, observerRef]);

//   return (
//     <>
//       {isLoading && <Loader fixed={false} />}
//       <div ref={observerRef} />
//     </>
//   );
// };

// export default InfiniteScroll;
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
  }, [currentPage, isLoading, totalPages]);

  return (
    <>
      {isLoading && <Loader fixed={false} />}
      <div ref={observerRef} />
    </>
  );
};

export default InfiniteScroll;
