import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AdminRequestDetails = () => {
    const { id } = useParams();

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
            <main className="p-6 max-w-5xl mx-auto">
                <div className="mb-6">
                    <Link to="/admin/requests" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Requests
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">Request #REQ-2024-001</h1>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Pending Action
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Request Details Column */}
                    <div className="col-span-2 space-y-6">
                        {/* Request Info Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Request Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Document Type</p>
                                    <p className="font-medium text-slate-900">Academic Transcript (Official)</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Date Requested</p>
                                    <p className="font-medium text-slate-900">December 1, 2024 at 10:42 AM</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Purpose</p>
                                    <p className="font-medium text-slate-900">Graduate School Application</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Delivery Method</p>
                                    <p className="font-medium text-slate-900">Digital Download</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="text-sm text-slate-500 mb-2">Additional Notes</p>
                                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm">
                                    Please include current semester grades if possible. Need this for an application deadline on Dec 15th.
                                </p>
                            </div>
                        </div>

                        {/* Document Upload Section */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Fulfill Request</h2>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-slate-900">Click to upload document</p>
                                <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
                                    Complete Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminRequestDetails;
