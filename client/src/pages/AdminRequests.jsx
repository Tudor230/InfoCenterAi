import React from 'react';
import { Link } from 'react-router-dom';

const AdminRequests = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-900">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-slate-200 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-800">InfoCenter AI</span>
                            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded border border-blue-100">Admin</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Link to="/admin" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Dashboard</Link>
                            <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Requests</Link>
                            <Link to="/" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Chat</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                            AD
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Admin User</p>
                        </div>
                        <Link to="/login" className="text-slate-400 hover:text-slate-600 ml-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Document Requests Management</h1>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search requests..."
                                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-64"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Request ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Document Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Requested</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">#REQ-2024-001</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700">AC</div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Alex Chen</p>
                                            <p className="text-xs text-slate-500">ac123@e-uvt.ro</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">Academic Transcript (Official)</td>
                                <td className="px-6 py-4 text-sm text-slate-500">Dec 1, 2024</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to="/admin/requests/1" className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Details</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminRequests;
