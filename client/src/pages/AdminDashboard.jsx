import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

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
                            <Link to="/admin" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Dashboard</Link>
                            <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Requests</Link>
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
                        <button onClick={handleLogout} className="text-slate-400 hover:text-slate-600 ml-2 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Total Inquiries</p>
                        <p className="text-2xl font-bold text-slate-900">1,284</p>
                        <p className="text-xs text-green-600 mt-1">↑ 12% from last week</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Active Students</p>
                        <p className="text-2xl font-bold text-slate-900">156</p>
                        <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Policies Indexed</p>
                        <p className="text-2xl font-bold text-slate-900">847</p>
                        <p className="text-xs text-slate-500 mt-1">Across 12 departments</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-slate-900">1.2s</p>
                        <p className="text-xs text-green-600 mt-1">↓ 0.3s from last week</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Conversations Table */}
                    <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="font-semibold text-slate-800">Recent Inquiries</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search inquiries..."
                                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <select className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                                    <option>All Users</option>
                                    <option>Students</option>
                                    <option>Faculty</option>
                                    <option>Staff</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 text-left">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">User</th>
                                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">Topic</th>
                                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">Date</th>
                                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">Msgs</th>
                                        <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {/* Example Row */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700">AC</div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">Alex Chen</p>
                                                    <p className="text-xs text-slate-500">Student</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-700">Library quiet hours</td>
                                        <td className="px-5 py-3 text-sm text-slate-500">Dec 26, 10:42 AM</td>
                                        <td className="px-5 py-3 text-sm text-slate-500">3</td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                Resolved
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="px-5 py-4 border-b border-slate-200">
                            <h2 className="font-semibold text-slate-800">Knowledge Base Files</h2>
                        </div>
                        <div className="p-5">
                            {/* Upload Input */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Upload New Files</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        className="flex-1 text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Supported: PDF, DOCX, TXT, MD (Max 50MB)</p>
                            </div>

                            {/* Uploaded Files List */}
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-3">Recently Uploaded</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">Academic_Calendar_2025.pdf</p>
                                                <p className="text-xs text-slate-500 truncate">2.4 MB • Dec 1, 2024</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200 shrink-0 ml-3">Indexed</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">Student_Handbook_2024.pdf</p>
                                                <p className="text-xs text-slate-500 truncate">5.1 MB • Nov 30, 2024</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200 shrink-0 ml-3">Indexed</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">Dorm_Life_Guide.docx</p>
                                                <p className="text-xs text-slate-500 truncate">856 KB • Nov 28, 2024</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200 shrink-0 ml-3">Indexed</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">Fall_Enrollment_Stats.pdf</p>
                                                <p className="text-xs text-slate-500 truncate">3.2 MB • Nov 25, 2024</p>
                                            </div>
                                        </div>
                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded border border-yellow-200 shrink-0 ml-3">Processing</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">Campus_Safety_Protocol.txt</p>
                                                <p className="text-xs text-slate-500 truncate">124 KB • Nov 20, 2024</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200 shrink-0 ml-3">Indexed</span>
                                    </div>
                                </div>

                                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    View all 847 files →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
