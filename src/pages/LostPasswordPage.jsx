import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'flowbite-react';
import { FaEnvelope } from 'react-icons/fa';
import { lostPassword } from '../api/users.api';


export function LostPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await lostPassword(data);
      if (response.status === 200) {
        setMessage('Reset code sent to email.');
        setError('');
      } else {
        setError('There was an issue sending the reset code.');
        setMessage('');
      }
    } catch (err) {
      setError('There was an error sending the reset code.');
      setMessage('');
    }
  };

  return (
    <div className="pt-28 flex justify-center">
      <form className="w-full max-w-sm mx-auto mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-2xl pb-3">Reset password</div>
        <label htmlFor="email">Your email</label>
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
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button
          type="submit"
          color="blue"
          className="w-full mt-3"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
