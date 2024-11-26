import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SlSocialGoogle } from "react-icons/sl";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { cn } from '../../../lib/utils';
import NavigationBar from '../navBar/navbar';

export default function Login() {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            const response = await axios.post('http://localhost:3000/users/login', formData);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/Budget');
            }
        } catch (error: any) {
            setError('Invalid email or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <section className='relative w-full h-full flex justify-center items-center sm:p-16'>
            <NavigationBar />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#0000_40%,#63e_100%)]"></div>

            <div className='max-w-sm w-full border shadow-md mx-auto rounded-2xl px-6 py-8 shadow-input bg-white dark:bg-black space-y-3'>
                <div className='grid grid-cols-1 justify-items-center mb-4'>
                    <img src='/logo.png' className='h-12 shadow-md mb-4' alt="Logo" />
                    <div className='text-2xl font-bold'>Welcome back</div>
                    <p>Enter your credentials to login</p>
                </div>

                <form className="my-4 flex-col gap-2" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <LabelInputContainer>
                        <Label>Email Address</Label>
                        <input
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white focus-visible:-translate-y-1 transform transition duration-200 focus-visible:shadow-md hover:shadow-md hover:-translate-y-1 dark:shadow-white/50"
                            id="email"
                            type="email"
                            placeholder="maheshwar@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className='mb-5'>
                        <Label>Password</Label>
                        <div className='relative'>
                            <input
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white focus-visible:-translate-y-1 transform transition duration-200 focus-visible:shadow-md hover:shadow-md hover:-translate-y-1 dark:shadow-white/50"
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                type="button"
                            >
                                {isPasswordVisible ? <FaRegEye /> : <PiEyeClosedBold />}
                            </button>
                        </div>
                    </LabelInputContainer>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-3 group/button py-1.5 w-full text-white dark:text-black bg-black dark:bg-white rounded-lg font-medium hover:-translate-y-1 transform transition duration-200 hover:shadow-lg active:scale-95"
                    >
                        Sign In
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right group-hover/button:translate-x-2 group-hover/button:duration-200 group-hover/button:ease-in-out"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                    <Link to="/register">
                        <p className='text-center'>Don't have an account? Sign up</p>
                    </Link>
                    <div className="relative bg-gradient-to-r from-transparent dark:via-white via-black to-transparent my-4 h-[1px] w-full">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700 dark:bg-neutral-400 px-3 border-white dark:border-black border-4 py-0.5">
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="flex gap-3 items-center w-full border border-gray-300 rounded-lg px-6 py-1.5 text-sm font-medium dark:hover:shadow-white/40 hover:-translate-y-1 transform transition duration-200 hover:shadow-md active:scale-95"
                        >
                            <SlSocialGoogle className="size-5" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

// Label component
const Label = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("text-sm font-medium", className)}>
            {children}
        </div>
    );
};

// LabelInputContainer component
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("mb-2.5 flex flex-col space-y-1 w-full", className)}>
            {children}
        </div>
    );
};