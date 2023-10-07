import React from 'react';
import { TextInput, Button } from 'flowbite-react';
import { FaLock, FaEnvelope } from 'react-icons/fa';

export function LoginForm() {
  return (
    <form className="w-full max-w-sm mx-auto mt-10 space-y-4">
      <TextInput 
        icon={FaEnvelope}
        placeholder="Email"
        name="email"
        type="email"
      />
      <TextInput 
        icon={FaLock}
        placeholder="Password"
        name="password"
        type="password"
      />
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
