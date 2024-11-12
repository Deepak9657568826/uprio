import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useToast } from '@chakra-ui/react'
import axios from "axios"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const regitserUrl = `https://uprio-hb32.onrender.com/auth/login`

    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const fromData = {
            email,
            password,
        }

        const response = await axios.post(regitserUrl, fromData)
        console.log(response.data.Message);
        console.log(response.data.token);

        if (response.data.Message == `User with email id ${email} is not  register`) {
            setIsSubmitting(false);
            toast({
                title: 'please register first',
                description: `${response.data.Message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
        }

        else if (response.data.Message == `Login successfull`) {
            localStorage.setItem("token", response.data.token)
            toast({
                title: 'User register successfull.',
                description: "User register successfull.",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
            setIsSubmitting(false);
            navigate("/todo")
        }
        else if (response.data.Message == `Password is not correct`) {
            toast({
                title: 'Password wrong.',
                description: `${response.data.Message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
            setIsSubmitting(false);

        }
        else {
            toast({
                title: `${response.data.Message}`,
                description: `${response.data.Message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            })
        }


    };

    return (
        <div className="login-background">
            <form onSubmit={handleSubmit} className="logininform bg-violet-100 mx-auto p-6 bg-white shadow-lg rounded-md">
                <h3 className="text-xl font-extrabold p-6 text-center text-amber-950">Login</h3>
                <div className="space-y-4">
                    <div className="flex flex-col items-start">
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-1/3 px-5 py-2.5 text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${isSubmitting ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-blue-300`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <span className="loader mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                                Submitting...
                            </span>
                        ) : (
                            'Submit'
                        )}
                    </button>

                    {/* Link to Sign-Up Page */}
                    <p className="mt-4 text-sm text-gray-600 ">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">Sign up first</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
