import React from 'react';
import { Link } from 'react-router-dom';

const UserRequests = () => {
    return (
        <div className="bg-slate-50 min-h-screen flex text-slate-900">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <span className="font-semibold text-slate-800">InfoCenter AI</span>
                    </div>
                    <Link to="/" className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        Back to Chat
                    </Link>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        New Request
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <Link to="/requests" className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm font-medium">My Requests</span>
                    </Link>
                </div>

                {/* User Menu */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                            AC
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">Alex Chen</p>
                            <p className="text-xs text-slate-500">ac123@e-uvt.ro</p>
                        </div>
                        <Link to="/login" className="text-slate-400 hover:text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col bg-slate-50 p-8">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">My Document Requests</h1>
                            <p className="text-slate-500 mt-1">Track the status of your official document requests</p>
                        </div>
                    </div>

                    {/* Requests List */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Request ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Document Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Requested</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">#REQ-2024-001</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">Academic Transcript (Official)</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">Dec 1, 2024</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Processing
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 cursor-not-allowed" disabled>Download</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserRequests;
