import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'flowbite-react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../api/users.api';
import { login } from '../../api/base.api';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password2: '',
            country: ''
        }
    });
    useEffect(() => {
        axios.get('https://ipapi.co/json/')
            .then(response => {
                const countryName = response.data.country;
                console.log('country', countryName)
                if (countryName) {
                    setValue('country', countryName);
                }
            })
            .catch(error => {
                console.error('Error fetching country: ', error);
            });
    }, [setValue]);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        setSubmitting(true);
        setServerError(null);
        const registrationData = { ...data };
        if (data.country) {
            registrationData.country = data.country;
        }
        console.log("registerdata", registrationData);
        try {
            const response = await registerUser(registrationData);
            try {
                const loginResponse = await login({
                    username: data.email,
                    password: data.password
                });
                localStorage.setItem('token', loginResponse.data.token);
                // navigate('/');
                // window.location.reload();

            } catch (loginError) {
                console.error('Login error:', loginError);
                setServerError('Registration successful, but login failed. Please try logging in.');
            }
        } catch (error) {
            console.error('Registration error:', error);

            let errorMessage = 'An error occurred during registration.';
            if (error.response && error.response.data) {
                errorMessage = extractErrorMessage(error.response.data);
            }
            setServerError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };
    const extractErrorMessage = (errorData) => {
        if (errorData.non_field_errors) {
            return errorData.non_field_errors.join(' ');
        }
        const firstErrorKey = Object.keys(errorData)[0];
        return errorData[firstErrorKey].join(' ');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto mt-10 space-y-4">
            <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) =>
                    <TextInput
                        {...field}
                        icon={FaUser}
                        placeholder="Username"
                        color={errors.username ? 'failure' : 'gray'}
                        helperText={errors.username?.message}
                    />
                }
            />
            <Controller
                name="email"
                control={control}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                    },
                }}
                render={({ field }) =>
                    <TextInput
                        {...field}
                        icon={FaEnvelope}
                        placeholder="Email"
                        type="email"
                        color={errors.email ? 'failure' : 'gray'}
                        helperText={errors.email?.message}
                    />
                }
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) =>
                    <TextInput
                        {...field}
                        icon={FaLock}
                        placeholder="Password"
                        type="password"
                        color={errors.password ? 'failure' : 'gray'}
                        helperText={errors.password?.message}
                    />
                }
            />
            <Controller
                name="password2"
                control={control}
                rules={{
                    required: "Confirm Password is required",
                    validate: (value) => {
                        return (
                            value === '' ||
                            value === getValues().password ||
                            "Passwords must match"
                        );
                    },
                }}
                render={({ field }) =>
                    <TextInput
                        {...field}
                        icon={FaLock}
                        placeholder="Confirm Password"
                        type="password"
                        color={errors.password2 ? 'failure' : 'gray'}
                        helperText={errors.password2?.message}
                    />
                }
            />
            <Button
                type="submit"
                color="blue"
                className="w-full"
                disabled={submitting}
            >
                Register
            </Button>
            {serverError && (
                <p className="text-red-500 text-center">{serverError}</p>
            )}
        </form>
    );
}
