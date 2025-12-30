import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchConversations();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchConversations = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/chat/conversations', {
                headers: getAuthHeaders()
            });

            if (response.status === 401 || response.status === 403) {
                navigate('/login');
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setConversations(data);
                if (data.length > 0 && !activeConversationId) {
                    setActiveConversationId(data[0].id);
                }
            }
        } catch (error) {
            console.error('Failed to fetch conversations', error);
        } finally {
            setLoading(false);
        }
    };

    const createConversation = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/chat/conversations', {
                method: 'POST',
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const newConv = await response.json();
                setConversations([newConv, ...conversations]);
                setActiveConversationId(newConv.id);
            }
        } catch (error) {
            console.error('Failed to create conversation', error);
        }
    };

    const deleteConversation = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this chat?')) return;

        try {
            const response = await fetch(`http://localhost:8080/api/chat/conversations/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (response.ok) {
                setConversations(conversations.filter(c => c.id !== id));
                if (activeConversationId === id) {
                    setActiveConversationId(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete conversation', error);
        }
    };

    const renameConversation = async (id, currentTitle, e) => {
        e.stopPropagation();
        const newTitle = window.prompt('Enter new name:', currentTitle);
        if (!newTitle || newTitle === currentTitle) return;

        try {
            const response = await fetch(`http://localhost:8080/api/chat/conversations/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ title: newTitle })
            });
            if (response.ok) {
                setConversations(conversations.map(c =>
                    c.id === id ? { ...c, title: newTitle } : c
                ));
            }
        } catch (error) {
            console.error('Failed to rename conversation', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-white border-r border-slate-200">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-600/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <span className="font-semibold text-slate-800">InfoCenter AI</span>
                    </div>
                    <button
                        onClick={createConversation}
                        className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        New Chat
                    </button>
                    <Link to="/requests" className="flex items-center gap-3 px-3 py-2 mt-2 transition-colors rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="text-sm font-medium">My Requests</span>
                    </Link>
                </div>

                {/* Conversation List */}
                <div className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
                    {loading ? (
                        <div className="mt-4 text-sm text-center text-slate-400">Loading...</div>
                    ) : conversations.map(conv => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`p-3 rounded-lg cursor-pointer flex items-center justify-between group transition-colors ${activeConversationId === conv.id
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-slate-100 text-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <svg className={`w-5 h-5 shrink-0 ${activeConversationId === conv.id ? 'text-blue-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                <span className="text-sm font-medium truncate">{conv.title}</span>
                            </div>

                            {/* Action Buttons (Visible on Hover) */}
                            <div className="items-center hidden gap-1 group-hover:flex">
                                <button
                                    onClick={(e) => renameConversation(conv.id, conv.title, e)}
                                    className="p-1 rounded hover:bg-slate-200 text-slate-500"
                                    title="Rename"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => deleteConversation(conv.id, e)}
                                    className="p-1 text-red-500 rounded hover:bg-red-100"
                                    title="Delete"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Profile / Logout */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-600 bg-blue-100 rounded-full">
                                {localStorage.getItem('firstName')?.[0] || 'U'}
                            </div>
                            <div className="text-sm font-medium text-slate-700">
                                {localStorage.getItem('firstName')}
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-slate-800">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-col flex-1 bg-white">
                {activeConversationId ? (
                    <div className="flex items-center justify-center flex-1 text-slate-400">
                        {/* Chat messages will go here */}
                        <p>Chat functionality coming soon...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-slate-400">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                        </div>
                        <p>Select a conversation or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
