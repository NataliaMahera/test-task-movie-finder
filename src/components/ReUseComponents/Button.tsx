import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  onClick,
  type,
  ...props
}) => {
  return (
    <button className={className} type={type} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;
