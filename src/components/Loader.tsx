import { ThreeDots } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80vh]'>
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

// className="flex justify-center items-center h-[80vh]"