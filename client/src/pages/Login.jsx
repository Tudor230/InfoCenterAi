import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        const isTokenExpired = (token) => {
            if (!token) return true;
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const decoded = JSON.parse(jsonPayload);
                const exp = decoded.exp;
                const now = Date.now() / 1000;
                return exp < now;
            } catch (e) {
                return true;
            }
        };

        if (token && !isTokenExpired(token)) {
            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Email or password is incorrect');
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Save token and user details
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('lastName', data.lastName);
            localStorage.setItem('role', data.role);

            // Navigate based on role
            if (data.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
            <div className="w-full max-w-md p-6 sm:p-8 bg-white border shadow-2xl backdrop-blur rounded-2xl border-slate-200">
                {/* Logo / Title */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-600 rounded-full shadow-lg">
                        <svg className="text-white w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-900">InfoCenter AI</h1>
                    <p className="mt-2 text-slate-500">Secure access to the campus knowledge base</p>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 border border-red-200 rounded-lg bg-red-50">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-700">University Email</label>
                        <input
                            type="email"
                            placeholder="you@e-uvt.ro"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Sign In Button */}
                    <button type="submit" className="block w-full py-3 font-semibold text-center text-white transition-colors bg-blue-600 shadow-lg hover:bg-blue-700 rounded-xl shadow-blue-600/30">
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-sm text-center text-slate-500">
                    Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
