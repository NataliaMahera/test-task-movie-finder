import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface LoaderProps {
  fixed?: boolean;
}
export const Loader: React.FC<LoaderProps> = ({ fixed = false }) => {
  return (
    <div className={fixed ? "fixed inset-0 flex items-center justify-center h-screen z-50" : "flex items-center justify-center my-4"}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#6c9290"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

