import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
    const { conversationId } = useParams();
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const isAdmin = location.pathname.startsWith('/admin');

    useEffect(() => {
        if (!isAdmin) {
            fetchConversations();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (conversationId) {
            setActiveConversationId(conversationId);
        }
    }, [conversationId]);

    useEffect(() => {
        if (activeConversationId) {
            fetchMessages(activeConversationId);
        } else {
            setMessages([]);
        }
    }, [activeConversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isSending]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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

    const fetchMessages = async (conversationId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/chat/conversations/${conversationId}/messages`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to fetch messages', error);
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
                    setMessages([]);
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

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !activeConversationId) return;

        const currentMsg = inputMessage;
        setInputMessage('');
        setIsSending(true);

        // Optimistically add user message
        const tempUserMsg = {
            id: Date.now(),
            role: 'user',
            content: currentMsg,
            createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempUserMsg]);

        try {
            const response = await fetch(`http://localhost:8080/api/chat/conversations/${activeConversationId}/messages`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ content: currentMsg })
            });

            if (response.ok) {
                const assistantMsg = await response.json();
                setMessages(prev => [...prev, assistantMsg]);
            } else {
                console.error('Failed to send message');
                // Optionally remove the optimistic message here on failure
            }
        } catch (error) {
            console.error('Error sending message', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        navigate('/login');
    };

    return (
        <div className={`flex h-screen overflow-hidden bg-slate-50 ${isAdmin ? 'flex-col' : ''}`}>
            {isAdmin ? (
                <nav className="px-6 py-3 bg-white border-b border-slate-200 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-600/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                    </svg>
                                </div>
                                <span className="font-semibold text-slate-800">InfoCenter AI</span>
                                <span className="px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100 rounded bg-blue-50">Admin</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link to="/admin" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Dashboard</Link>
                                <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Requests</Link>
                                <span className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Chat</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-slate-200 text-slate-600">
                                {localStorage.getItem('firstName')?.[0] || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}
                                </p>
                            </div>
                            <button onClick={handleLogout} className="ml-2 transition-colors text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            ) : (
                /* Sidebar */
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
                        {localStorage.getItem('role') === 'ADMIN' && (
                            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 mt-1 transition-colors rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                        )}
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
            )}

            {/* Main Chat Area */}
            <div className="flex flex-col flex-1 overflow-hidden bg-white">
                {activeConversationId ? (
                    <>
                        {/* Chat Header */}
                        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    {conversations.find(c => c.id === activeConversationId)?.title || location.state?.title || 'Chat'}
                                </h2>
                                <p className="text-xs text-slate-500">InfoCenter AI • {messages.length} messages</p>
                            </div>
                        </header>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            {messages.map((msg) => {
                                const isUser = msg.role === 'user';
                                const isReadOnly = isAdmin;
                                const chatUser = location.state?.user;
                                const displayName = isUser ? (isReadOnly && chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : localStorage.getItem('firstName')) : 'InfoCenter AI';
                                const displayInitial = isUser ? (isReadOnly && chatUser ? chatUser.firstName?.[0] : localStorage.getItem('firstName')?.[0]) : null;

                                return (
                                    <div key={msg.id} className={`flex max-w-3xl gap-4 mx-auto ${isUser ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-medium ${isUser ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white shadow-md'
                                            }`}>
                                            {isUser ? (
                                                displayInitial || 'U'
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                                </svg>
                                            )}
                                        </div>
                                        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
                                            <div className={`flex items-center gap-2 mb-1 ${isUser ? 'justify-end' : ''}`}>
                                                <span className="font-semibold text-slate-900">
                                                    {displayName}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className={`leading-relaxed text-slate-800 ${msg.role === 'assistant' ? 'prose prose-sm max-w-none' : 'whitespace-pre-wrap'}`}>
                                                {msg.role === 'assistant' ? (
                                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {isSending && (
                                <div className="flex max-w-3xl gap-4 mx-auto opacity-50">
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full shadow-md shrink-0">
                                        <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-slate-900">InfoCenter AI</span>
                                        </div>
                                        <div className="italic text-slate-500">Thinking...</div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-200">
                            <form onSubmit={handleSendMessage} className="relative max-w-3xl mx-auto">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                    placeholder={isAdmin ? "Read-only view" : "Ask anything about campus policies, schedules, or services..."}
                                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
                                    rows="1"
                                    disabled={isSending || isAdmin}
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={!inputMessage.trim() || isSending || isAdmin}
                                    className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    </svg>
                                </button>
                            </form>
                            <p className="mt-3 text-xs text-center text-slate-400">
                                InfoCenter AI can make mistakes. Please verify important information.
                            </p>
                        </div>
                    </>
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
