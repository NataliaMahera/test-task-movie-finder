import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import LoginBtn from '../ReUseComponents/Button';
import SignUpBtn from '../ReUseComponents/Button';
import Modal from '../ReUseComponents/Modal';
import { ModalType } from '../AuthForms/types';
import LoginForm from '../AuthForms/LoginForm';
import SignupForm from '../AuthForms/SignupForm';
import { AUTH_TYPE } from '../../core/constants';

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
      return <LoginForm closeModal={closeModal} />;
    } else if (modalType === 'SIGNUP') {
      return <SignupForm closeModal={closeModal} />;
    }
    return null;
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-[16px]">
        <div className='flex items-center gap-1 justify-center '>
        <FiLogIn className="w-6 h-6 stroke-yellow-300" />
        <LoginBtn
          className="hover:text-yellow-300 text-white text-lg font-medium transition duration-300 ease-in-out transform focus:outline-none"
          type="button"
          text="Log in"
          onClick={() => openModal(AUTH_TYPE.LOGIN)}
        />
        </div>
        <SignUpBtn
          className="px-4 py-2 bg-blue-800 rounded-lg hover:text-yellow-300 text-white text-lg font-medium transition duration-300 ease-in-out transform focus:outline-none"
          type="button"
          text="Sign Up"
          onClick={() => openModal(AUTH_TYPE.SIGNUP)}
        />
      </div>
      {isOpenModal && (
        <Modal
          closeModal={closeModal}
          body={getModalContent()}
        />
      )}
    </>
  );
};

export default AuthNav;
