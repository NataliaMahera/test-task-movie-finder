import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';
import { ToastOptions } from 'react-toastify';

const isMobile = window.innerWidth <= 768; 

export const styleToastify: ToastOptions = {
  position: isMobile ? 'top-center' : 'bottom-right', 
  autoClose: 3000,
  hideProgressBar: isMobile ? true : false, 
  closeOnClick: true,
  pauseOnHover: true,
  draggable: !isMobile, 
  progress: undefined,
  theme: 'colored',
  transition: Flip,
};
