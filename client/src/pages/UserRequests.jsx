import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        documentType: 'Academic Transcript',
        purpose: '',
        deliveryMethod: 'DIGITAL_DOWNLOAD',
        additionalNotes: ''
    });

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
            const response = await fetch('http://localhost:8080/api/requests', {
                headers: getAuthHeaders()
            });
            if (response.status === 401) {
                navigate('/login');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            }
        } catch (error) {
            console.error('Failed to fetch requests', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/requests', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newRequest = await response.json();
                setRequests([newRequest, ...requests]);
                setIsModalOpen(false);
                setFormData({
                    documentType: 'Academic Transcript',
                    purpose: '',
                    deliveryMethod: 'DIGITAL_DOWNLOAD',
                    additionalNotes: ''
                });
            }
        } catch (error) {
            console.error('Failed to create request', error);
        }
    };

    const handleCancelRequest = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this request?')) return;

        try {
            const response = await fetch(`http://localhost:8080/api/requests/${id}/cancel`, {
                method: 'PATCH',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setRequests(requests.map(req =>
                    req.id === id ? { ...req, status: 'CANCELLED' } : req
                ));
            }
        } catch (error) {
            console.error('Failed to cancel request', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen text-slate-900 bg-slate-50">
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
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        New Request
                    </button>
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 mt-2 transition-colors rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        <span className="text-sm font-medium">Back to Chat</span>
                    </Link>
                </div>

                {/* Navigation List */}
                <div className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
                    <div className="flex items-center justify-between p-3 text-blue-700 transition-colors rounded-lg cursor-pointer group bg-blue-50">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span className="text-sm font-medium truncate">My Requests</span>
                        </div>
                    </div>
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

            {/* Main Content Area */}
            <main className="flex flex-col flex-1 p-8 bg-slate-50">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">My Document Requests</h1>
                            <p className="mt-1 text-slate-500">Track the status of your official document requests</p>
                        </div>
                    </div>

                    {/* Requests List */}
                    <div className="overflow-hidden bg-white border shadow-sm border-slate-200 rounded-xl">
                        <table className="w-full text-left">
                            <thead className="border-b bg-slate-50 border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Request ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Document Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Date Requested</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider uppercase text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-right uppercase text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-slate-500">Loading requests...</td>
                                    </tr>
                                ) : requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-slate-500">No requests found. Create one to get started.</td>
                                    </tr>
                                ) : (
                                    requests.map((req) => (
                                        <tr key={req.id} className="transition-colors hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">#{req.id}</td>
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
                                                <div className="flex items-center justify-end gap-3">
                                                    {req.status === 'PENDING' && (
                                                        <button
                                                            onClick={() => handleCancelRequest(req.id)}
                                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    {req.status === 'COMPLETED' && req.deliveryMethod === 'DIGITAL_DOWNLOAD' ? (
                                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Download</button>
                                                    ) : (
                                                        <span className="text-sm font-medium cursor-not-allowed text-slate-400">Download</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* New Request Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">New Document Request</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-slate-700">Document Type</label>
                                <select
                                    name="documentType"
                                    value={formData.documentType}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Academic Transcript">Academic Transcript</option>
                                    <option value="Enrollment Certificate">Enrollment Certificate</option>
                                    <option value="Diploma Supplement">Diploma Supplement</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-slate-700">Purpose</label>
                                <input
                                    type="text"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Graduate School Application"
                                    required
                                    className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-slate-700">Delivery Method</label>
                                <select
                                    name="deliveryMethod"
                                    value={formData.deliveryMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="DIGITAL_DOWNLOAD">Digital Download</option>
                                    <option value="IN_PERSON">In Person Pickup</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-slate-700">Additional Notes</label>
                                <textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Any specific details..."
                                    className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 font-medium transition-colors rounded-lg text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRequests;
