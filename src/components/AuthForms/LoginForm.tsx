import { FC } from 'react';
import { ModalProps } from './form.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch  } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
import { LogInSchema, LogInSchemaType } from '../../schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';

const LoginForm: FC<ModalProps> = () => {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInSchemaType>({ resolver: zodResolver(LogInSchema) });


  const onSubmit: SubmitHandler<LogInSchemaType> = (data) => {
    dispatch(login(data))
  }

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
      <label className="block text-gray-700 text-sm font-bold mt-3 sm:mt-4 mb-1 sm:mb-2">
        Email
      </label>
      <input
        type="email"
        placeholder="example@email.com"
        {...register('email')}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.email && (
        <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
      )}

      <label className="block text-gray-700 text-sm font-bold mt-3 sm:mt-4 mb-1 sm:mb-2">
        Password
      </label>
      <input
        type="password"
        placeholder="at least 6 characters"
        {...register('password')}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.password && (
        <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
      )}
      <button
        type="submit"
        className="transition-all duration-300 ease-in-out rounded w-full mt-4 sm:mt-6 p-2 sm:p-3 font-bold py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-xl"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
