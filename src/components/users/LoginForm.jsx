import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'flowbite-react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { login } from '../../api/base.api';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const onSubmit = async (data) => {
    try {
      const apiData = {
        username: data.email,
        password: data.password,
      };
      const response = await login(apiData);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
        window.location.reload();
      } else {
        setServerError('Login was successful, but no token was received.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.non_field_errors) {
          setServerError(errorData.non_field_errors.join(' '));
        } else {
          setServerError('An error occurred while trying to log in. Please try again.');
        }
      } else {
        setServerError('An error occurred while trying to log in. Please try again.');
      }
    }
  };
  return (
    <form className="w-full max-w-sm mx-auto mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        icon={FaEnvelope}
        placeholder="Email"
        name="email"
        type="email"
        {...register('email', {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address"
          }
        })}
        color={errors.email ? 'failure' : 'gray'}
        helpertext={errors.email ? errors.email.message : undefined}
      />
      <TextInput
        icon={FaLock}
        placeholder="Password"
        name="password"
        type="password"
        {...register('password', {
          required: "Password is required",
        })}
        color={errors.password ? 'failure' : 'gray'}
        helpertext={errors.password ? errors.password.message : undefined}
      />
      {serverError && (
        <p className="text-red-500 text-center">{serverError}</p>
      )}
      <Button
        type="submit"
        color="blue"
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
}
