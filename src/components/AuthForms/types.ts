export type ModalType = 'LOGIN' | 'SIGNUP' | null;

export const TYPE = {
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
  } as const;

export interface ModalProps {
  closeModal: () => void;
  isOpen?: boolean;
  modalData?: ModalType;
  body?: React.ReactNode;
  type?: string;
}
