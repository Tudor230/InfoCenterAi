import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [uploading, setUploading] = useState(false);
    const KNOWLEDGE_BASE_FOLDER_ID = import.meta.env.VITE_DRIVE_KNOWLEDGE_BASE_FOLDER_ID;

    useEffect(() => {
        fetchFiles();
        fetchInquiries();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchInquiries = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/conversations`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Failed to fetch inquiries', error);
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drive/list?folderId=${KNOWLEDGE_BASE_FOLDER_ID}`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
            }
        } catch (error) {
            console.error('Failed to fetch files', error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Only PDF files are allowed.');
            e.target.value = ''; // Reset input
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderId', KNOWLEDGE_BASE_FOLDER_ID);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drive/upload`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: formData
            });

            if (response.ok) {
                fetchFiles(); // Refresh list
                e.target.value = ''; // Reset input
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading');
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Top Navigation */}
            <nav className="px-6 py-3 bg-white border-b border-slate-200">
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
                            <Link to="/admin" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Dashboard</Link>
                            <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Requests</Link>
                            <Link to="/" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Chat</Link>
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

            {/* Main Content */}
            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
                        <p className="mb-1 text-sm text-slate-500">Total Inquiries</p>
                        <p className="text-2xl font-bold text-slate-900">{inquiries.length}</p>
                    </div>
                    <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
                        <p className="mb-1 text-sm text-slate-500">Active Students</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {new Set(inquiries.map(i => i.user?.email).filter(Boolean)).size}
                        </p>
                    </div>
                    <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
                        <p className="mb-1 text-sm text-slate-500">Policies Indexed</p>
                        <p className="text-2xl font-bold text-slate-900">{files.length}</p>
                    </div>
                </div>

                <div className="grid items-start grid-cols-3 gap-6">
                    {/* Conversations Table */}
                    <div className="col-span-2 bg-white border shadow-sm rounded-xl border-slate-200">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                            <h2 className="font-semibold text-slate-800">Recent Inquiries</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search inquiries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="text-left bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">User</th>
                                        <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">Topic</th>
                                        <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">Created</th>
                                        <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">Updated</th>
                                        <th className="px-5 py-3 text-xs font-medium uppercase text-slate-500">Msgs</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {inquiries.filter(inquiry => {
                                        const searchLower = searchQuery.toLowerCase();
                                        const firstName = inquiry.user?.firstName?.toLowerCase() || '';
                                        const lastName = inquiry.user?.lastName?.toLowerCase() || '';
                                        const title = inquiry.title?.toLowerCase() || '';
                                        return firstName.includes(searchLower) ||
                                            lastName.includes(searchLower) ||
                                            title.includes(searchLower);
                                    }).length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-5 py-4 text-sm text-center text-slate-500">
                                                No recent inquiries found.
                                            </td>
                                        </tr>
                                    ) : (
                                        inquiries.filter(inquiry => {
                                            const searchLower = searchQuery.toLowerCase();
                                            const firstName = inquiry.user?.firstName?.toLowerCase() || '';
                                            const lastName = inquiry.user?.lastName?.toLowerCase() || '';
                                            const title = inquiry.title?.toLowerCase() || '';
                                            return firstName.includes(searchLower) ||
                                                lastName.includes(searchLower) ||
                                                title.includes(searchLower);
                                        }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                            .map((inquiry) => (
                                                <tr
                                                    key={inquiry.id}
                                                    className="transition-colors cursor-pointer hover:bg-slate-50"
                                                    onClick={() => navigate(`/admin/chat/${inquiry.id}`, { state: { user: inquiry.user, title: inquiry.title } })}
                                                >
                                                    <td className="px-5 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                                                {inquiry.user?.firstName?.[0] || inquiry.user?.email?.[0] || 'U'}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-slate-900">
                                                                    {inquiry.user?.firstName} {inquiry.user?.lastName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 text-sm text-slate-700">{inquiry.title || 'No Topic'}</td>
                                                    <td className="px-5 py-3 text-sm text-slate-500">
                                                        {new Date(inquiry.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-5 py-3 text-sm text-slate-500">
                                                        {new Date(inquiry.updatedAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-5 py-3 text-sm text-slate-500">{inquiry.messageCount || 0}</td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="bg-white border shadow-sm rounded-xl border-slate-200">
                        <div className="px-5 py-4 border-b border-slate-200">
                            <h2 className="font-semibold text-slate-800">Knowledge Base Files</h2>
                        </div>
                        <div className="p-5">
                            {/* Upload Input */}
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-slate-700">Upload New Files</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="flex-1 text-sm cursor-pointer text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer disabled:opacity-50"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-slate-500">Supported: PDF (Max 50MB)</p>
                            </div>

                            {/* Uploaded Files List */}
                            <div>
                                <p className="mb-3 text-sm font-medium text-slate-500">Recently Uploaded</p>
                                <div className="space-y-2">
                                    {files.length === 0 ? (
                                        <p className="py-4 text-sm text-center text-slate-500">No files found.</p>
                                    ) : (
                                        files.map((file) => (
                                            <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 border-slate-200">
                                                <div className="flex items-center flex-1 min-w-0 gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded shrink-0">
                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate text-slate-700">{file.name}</p>
                                                        <p className="text-xs truncate text-slate-500">
                                                            {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'} • {new Date(file.createdTime).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <a
                                                    href={file.webViewLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-1 ml-3 text-xs text-blue-700 border border-blue-100 rounded bg-blue-50 shrink-0 hover:bg-blue-100"
                                                >
                                                    View
                                                </a>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
