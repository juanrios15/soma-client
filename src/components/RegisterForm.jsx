import React from 'react';
import { TextInput, Button } from 'flowbite-react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

export function RegisterForm() {
    return (
        <form className="w-full max-w-sm mx-auto mt-10 space-y-4">
            <TextInput
                icon={FaUser}
                placeholder="Username"
                name="username"
            />
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
            <TextInput
                icon={FaLock}
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
            />
            <Button
                type="submit"
                color="blue"
                className="w-full"
            >
                Register
            </Button>
        </form>
    );
}
