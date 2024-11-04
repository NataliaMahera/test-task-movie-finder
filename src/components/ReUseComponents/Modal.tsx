import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const portal = document.getElementById('portal') as HTMLElement;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    >
      <div className="bg-gray-200 p-4 z-40 sm:p-5 rounded relative shadow-md max-w-xs sm:max-w-md w-full">
        <MdOutlineClose
          className="absolute top-2 right-2 fill-black cursor-pointer"
          size={30}
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    portal
  );
};

export default Modal;
