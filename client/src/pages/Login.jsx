import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white backdrop-blur rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-200">
                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-900">InfoCenter AI</h1>
                    <p className="text-slate-500 mt-2">Secure access to the campus knowledge base</p>
                </div>

                {/* Login Form */}
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">University Email</label>
                        <input
                            type="email"
                            placeholder="you@e-uvt.ro"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>

                    {/* Sign In Button */}
                    <Link to="/" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center shadow-lg shadow-blue-600/30 transition-colors">
                        Sign In
                    </Link>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Need access? <a href="#" className="text-blue-600 font-medium hover:underline">Contact IT Services</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
