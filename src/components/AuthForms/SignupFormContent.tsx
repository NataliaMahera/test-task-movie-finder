import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { signup } from '../../redux/auth/authSlice';
import { SignUpSchemaType } from './types';
import { SignUpSchema } from './validation';

const SignupFormContent: FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    dispatch(signup(data)) 
    navigate('/favorites')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto px-6 sm:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8 mb-4 w-full"
    >
      <h1 className="text-2xl sm:text-3xl text-center text-blue-500 font-semibold mb-3 sm:mb-4">
        Create New Account
      </h1>
      <p className="text-sm sm:text-md mb-4 sm:mb-6 text-center text-gray-600">
        Please fill in all required fields to create your account.
      </p>
      <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2">
        Username
      </label>
      <input
        type="text"
        placeholder="first and last name"
        {...register('username')}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors.username && (
        <p className="text-red-500 text-xs italic">{errors.username.message}</p>
      )}

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
        <p className="text-red-500 text-xs italic">{errors.email.message}</p>
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
        <p className="text-red-500 text-xs italic">{errors.password.message}</p>
      )}
      <button
        className="transition-all duration-300 ease-in-out rounded w-full mt-4 sm:mt-6 p-2 sm:p-3 font-bold py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-xl"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupFormContent;