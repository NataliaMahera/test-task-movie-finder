import { ThreeDots } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen z-50">
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

