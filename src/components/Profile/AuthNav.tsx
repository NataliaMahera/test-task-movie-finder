import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { ModalType } from '../AuthForms/types';
import { AUTH_TYPE } from '../../core/constants';
import LoginFormContent from '../AuthForms/LoginFormContent';
import SignupFormContent from '../AuthForms/SignupFormContent';
import Modal from '../ReUseComponents/Modal';

const AuthNav = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setIsOpenModal(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalType(null);
  };

  const getModalContent = () => {
    if (modalType === 'LOGIN') {
      return <LoginFormContent />;
    } else if (modalType === 'SIGNUP') {
      return <SignupFormContent />;
    }
    return null;
  };

  return (
    <>
      <div className="flex gap-5">
          <button
            className="hover:text-yellow-300 flex items-center gap-2 justify-center text-white text-lg font-medium transition duration-300 ease-in-out transform focus:outline-none"
            type="button"
            onClick={() => openModal(AUTH_TYPE.LOGIN)}
          >
             <FiLogIn className="w-6 h-6 stroke-yellow-300" />
            Log in
          </button>
          <button
            className="px-4 py-2 bg-blue-800 rounded-lg hover:text-yellow-300 text-white text-lg font-medium transition duration-300 ease-in-out transform focus:outline-none"
            type="button"
            onClick={() => openModal(AUTH_TYPE.SIGNUP)}
          >
            Sign Up
          </button>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModal} body={getModalContent()} />
      )}
    </>
  );
};

export default AuthNav;
