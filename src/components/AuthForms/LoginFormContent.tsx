import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { login } from '../../redux/auth/authSlice';
import { LogInSchemaType } from './types';
import { LogInSchema } from './validation';
import FormInput from '../ReUseComponents/FormInput';

const LoginFormContent: FC = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInSchemaType>({ resolver: zodResolver(LogInSchema) });

  const onSubmit: SubmitHandler<LogInSchemaType> = (data) => {
    dispatch(login(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8 mb-4 w-full"
    >
      <h1 className="text-2xl sm:text-3xl text-center text-blue-500 font-semibold mb-3 sm:mb-4">
        Log In
      </h1>
      <p className="text-sm sm:text-md mb-4 sm:mb-6 text-center text-gray-600">
        Welcome back! Please enter your credentials to access your account.
      </p>
      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="example@email.com"
        control={control}
        errors={errors.email}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="at least 6 characters"
        control={control}
        errors={errors.password}
      />
      <button className="transition-all duration-300 ease-in-out rounded w-full mt-4 sm:mt-6 p-2 sm:p-3 font-bold py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-xl">
        Log In
      </button>
    </form>
  );
};

export default LoginFormContent;
