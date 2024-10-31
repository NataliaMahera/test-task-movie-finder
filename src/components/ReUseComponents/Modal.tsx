import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../AuthForms/form.types';
import { MdOutlineClose } from 'react-icons/md';

const Modal: FC<ModalProps> = ({ closeModal, body }) => {
  const portal = document.getElementById('portal') as HTMLElement;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
    >
      <div className="bg-gray-200 p-5 rounded relative shadow-md">
        <MdOutlineClose className="absolute top-2 right-2 fill-black cursor-pointer" size={30} onClick={closeModal} />
        {body}
      </div>
    </div>,
    portal
  );
};

export default Modal;
