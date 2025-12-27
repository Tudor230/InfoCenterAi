import React from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
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
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        New Conversation
                    </button>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <Link to="/requests" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors mb-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm font-medium">My Requests</span>
                    </Link>

                    <p className="text-xs font-medium text-slate-500 uppercase px-2 mb-2">Today</p>

                    {/* Active Conversation */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 cursor-pointer">
                        <p className="text-sm font-medium text-blue-900 truncate">Library quiet hours policy</p>
                        <p className="text-xs text-blue-600 mt-1">2 minutes ago</p>
                    </div>

                    <div className="hover:bg-slate-50 rounded-lg p-3 cursor-pointer transition-colors">
                        <p className="text-sm font-medium text-slate-700 truncate">STEM tutoring hours overview</p>
                        <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                    </div>
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

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col h-screen">
                {/* Chat Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-800">Library quiet hours policy</h2>
                        <p className="text-xs text-slate-500">InfoCenter AI • 3 messages</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* User Message */}
                    <div className="flex gap-4 max-w-3xl mx-auto">
                        <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0 flex items-center justify-center text-sm font-medium text-slate-600">
                            AC
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-900">Alex Chen</span>
                                <span className="text-xs text-slate-500">10:42 AM</span>
                            </div>
                            <div className="text-slate-800 leading-relaxed">
                                What are the quiet hours for the main library during finals week?
                            </div>
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-4 max-w-3xl mx-auto">
                        <div className="w-8 h-8 bg-blue-600 rounded-full shrink-0 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-slate-900">InfoCenter AI</span>
                                <span className="text-xs text-slate-500">10:42 AM</span>
                            </div>
                            <div className="text-slate-800 leading-relaxed">
                                <p className="mb-3">During finals week (December 11-17), the main library has extended quiet hours:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-3">
                                    <li><strong>Floors 1-2:</strong> Quiet study from 8:00 AM to 10:00 PM</li>
                                    <li><strong>Floors 3-4:</strong> Silent study 24/7</li>
                                    <li><strong>Group Study Rooms:</strong> Available for booking 24/7</li>
                                </ul>
                                <p>Would you like me to help you book a study room?</p>
                            </div>

                            {/* Sources/Citations */}
                            <div className="mt-4 flex gap-2">
                                <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Library Schedule 2024.pdf
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-slate-200">
                    <div className="max-w-3xl mx-auto relative">
                        <textarea
                            placeholder="Ask anything about campus policies, schedules, or services..."
                            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none shadow-sm"
                            rows="1"
                        ></textarea>
                        <button className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                        </button>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-3">
                        InfoCenter AI can make mistakes. Please verify important information.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Chat;
