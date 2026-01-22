import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [usersMap, setUsersMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchRequests = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests`, {
                headers: getAuthHeaders()
            });
            if (response.status === 401 || response.status === 403) {
                navigate('/login');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                // Sort requests by date (newest first)
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRequests(sortedData);

                // Fetch missing users
                const userIdsToFetch = [...new Set(sortedData.filter(r => !r.user && r.userId).map(r => r.userId))];
                if (userIdsToFetch.length > 0) {
                    fetchMissingUsers(userIdsToFetch);
                }
            }
        } catch (error) {
            console.error('Failed to fetch requests', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMissingUsers = async (userIds) => {
        const newUsersMap = {};
        await Promise.all(userIds.map(async (id) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                    headers: getAuthHeaders()
                });
                if (res.ok) {
                    const user = await res.json();
                    newUsersMap[id] = user;
                }
            } catch (e) {
                console.error(`Failed to fetch user ${id}`, e);
            }
        }));

        if (Object.keys(newUsersMap).length > 0) {
            setUsersMap(prev => ({ ...prev, ...newUsersMap }));
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const filteredRequests = requests.filter(req => {
        const user = req.user || usersMap[req.userId];
        const matchesStatus = filterStatus === 'all' || req.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesSearch = req.id.toString().includes(searchTerm) ||
            user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.documentType.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Top Navigation */}
            <nav className="px-4 py-3 bg-white border-b sm:px-6 border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-600/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-800">InfoCenter AI</span>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 sm:hidden"
                                aria-label="Log out"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                Logout
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                            <Link to="/admin" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Dashboard</Link>
                            <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Requests</Link>
                            <Link to="/" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Chat</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="items-center justify-center hidden w-8 h-8 text-sm font-medium rounded-full sm:flex bg-slate-200 text-slate-600">
                            {localStorage.getItem('firstName')?.[0] || 'A'}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-slate-700">{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 sm:text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span className="hidden sm:inline">Log out</span>
                            <span className="sm:hidden">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-4 mx-auto sm:p-6 max-w-7xl">
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Document Requests Management</h1>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg sm:w-64 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <svg className="absolute w-4 h-4 text-slate-400 left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 text-sm bg-white border rounded-lg sm:w-auto border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden bg-white border shadow-sm border-slate-200 rounded-xl">
                    {/* Mobile cards */}
                    <div className="divide-y divide-slate-200 sm:hidden">
                        {loading ? (
                            <div className="p-4 text-center text-slate-500">Loading requests...</div>
                        ) : filteredRequests.length === 0 ? (
                            <div className="p-4 text-center text-slate-500">No requests found.</div>
                        ) : (
                            filteredRequests.map((req) => {
                                const user = req.user || usersMap[req.userId];
                                return (
                                    <div
                                        key={req.id}
                                        className="p-4 cursor-pointer hover:bg-slate-50"
                                        onClick={() => navigate(`/admin/requests/${req.id}`)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-semibold text-slate-900">#{req.id}</div>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${req.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                req.status === 'REJECTED' || req.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-sm text-slate-700">{req.documentType}</div>
                                        <div className="mt-1 text-xs text-slate-500">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="mt-2 text-xs text-slate-500">
                                            {user?.firstName && user?.lastName
                                                ? `${user.firstName} ${user.lastName}`
                                                : user?.email || `User ID: ${req.userId || 'Unknown'}`}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto sm:block">
                        <table className="w-full min-w-[900px] text-left">
                            <thead className="border-b bg-slate-50 border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Request ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">User</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Document Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Date Requested</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right uppercase text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-slate-500">Loading requests...</td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-slate-500">No requests found.</td>
                                    </tr>
                                ) : (
                                    filteredRequests.map((req) => {
                                        const user = req.user || usersMap[req.userId];
                                        return (
                                            <tr key={req.id} className="transition-colors hover:bg-slate-50">
                                                <td className="px-6 py-4 text-sm font-medium text-slate-900">#{req.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                                            {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900">
                                                                {user?.firstName && user?.lastName
                                                                    ? `${user.firstName} ${user.lastName}`
                                                                    : user?.email || `User ID: ${req.userId || 'Unknown'}`}
                                                            </p>
                                                            <p className="text-xs text-slate-500">{user?.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700">{req.documentType}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {new Date(req.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${req.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'REJECTED' || req.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link to={`/admin/requests/${req.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">View Details</Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminRequests;
