import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'flowbite-react';
import { FaLock, FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/users.api';
import { login } from '../api/base.api';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data);

      if (response.status === 200 && response.data) {
        const loginData = {
          username: response.data.username,
          password: data.password,
        };
        console.log(loginData);
        const loginResponse = await login(loginData);
        if (loginResponse.data && loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          navigate('/');
          window.location.reload();
        } else {
          setServerError('Password was reset successfully, but there was an issue with logging in.');
        }
      } else {
        setServerError('There was an issue with resetting your password. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          setServerError(errorData);
        } else if (errorData.non_field_errors) {
          setServerError(errorData.non_field_errors.join(' '));
        } else if (errorData.password) {
          setServerError(errorData.password.join(' '));
        } else if (errorData.detail) {
          setServerError(errorData.detail);
        } else {
          setServerError('An error occurred while trying to reset the password. Please try again.');
        }
      } else {
        setServerError('An error occurred while trying to reset the password. Please try again.');
      }
    }
  };


  return (
    <form className="pt-28 w-full max-w-sm mx-auto mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>

      <TextInput
        icon={FaKey}
        label="Your Code"
        placeholder="Enter your reset code"
        name="reset_code"
        {...register('reset_code', {
          required: "Reset code is required",
        })}
        color={errors.reset_code ? 'failure' : 'gray'}
        helpertext={errors.reset_code ? errors.reset_code.message : undefined}
      />

      <TextInput
        icon={FaLock}
        label="Password"
        placeholder="Enter password"
        name="password"
        type="password"
        {...register('password', {
          required: "Password is required",
        })}
        color={errors.password ? 'failure' : 'gray'}
        helpertext={errors.password ? errors.password.message : undefined}
      />

      <TextInput
        icon={FaLock}
        label="Confirm Password"
        placeholder="Confirm password"
        name="password2"
        type="password"
        {...register('password2', {
          required: "Password confirmation is required",
        })}
        color={errors.password2 ? 'failure' : 'gray'}
        helpertext={errors.password2 ? errors.password2.message : undefined}
      />

      {serverError && (
        <p className="text-red-500 text-center">{serverError}</p>
      )}

      <Button
        type="submit"
        color="blue"
        className="w-full"
      >
        Reset Password
      </Button>
    </form>
  );
}
