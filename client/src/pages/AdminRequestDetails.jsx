import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AdminRequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [showRejectAction, setShowRejectAction] = useState(false);
    const [showCompleteAction, setShowCompleteAction] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchRequestDetails();
    }, [id]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchRequestDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}`, {
                headers: getAuthHeaders()
            });
            if (response.status === 401 || response.status === 403) {
                navigate('/login');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log('Request details:', data);
                setRequest(data);

                // Attempt to fetch user details if missing but userId is present
                if (!data.user && data.userId) {
                    fetchUserDetails(data.userId);
                }
            } else {
                console.error('Failed to fetch request details');
                navigate('/admin/requests');
            }
        } catch (error) {
            console.error('Error fetching request details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const userData = await response.json();
                setRequest(prev => ({ ...prev, user: userData }));
            }
        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }
        setUpdating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/status?status=REJECTED`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ reason: rejectionReason })
            });

            if (response.ok) {
                const updatedRequest = await response.json();
                setRequest(updatedRequest);
                setShowRejectAction(false);
                setRejectionReason('');
            } else {
                alert('Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('An error occurred while rejecting the request');
        } finally {
            setUpdating(false);
        }
    };

    const handleComplete = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        if (selectedFile.type !== 'application/pdf') {
            alert('Only PDF files are allowed');
            return;
        }

        setUpdating(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('folderId', import.meta.env.VITE_DRIVE_REQUESTS_FOLDER_ID);
            formData.append('requestId', id);

            // Upload file
            const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/drive/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (uploadResponse.ok) {
                const fileData = await uploadResponse.text();

                // Update request status with file info
                const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/status?status=COMPLETED`, {
                    method: 'PATCH',
                    headers: getAuthHeaders()
                });

                if (updateResponse.ok) {
                    const updatedRequest = await updateResponse.json();
                    setRequest(updatedRequest);
                    setShowCompleteAction(false);
                    setSelectedFile(null);
                } else {
                    alert('Failed to complete request');
                }
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error completing request:', error);
            alert('An error occurred while completing the request');
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        if (!window.confirm(`Are you sure you want to mark this request as ${newStatus}?`)) return;

        setUpdating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/status?status=${newStatus}`, {
                method: 'PATCH',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const updatedRequest = await response.json();
                setRequest(updatedRequest);
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while updating the status');
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-slate-500">Loading request details...</div>
            </div>
        );
    }

    if (!request) {
        return null;
    }

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
                            <Link to="/admin" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Dashboard</Link>
                            <Link to="/admin/requests" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Requests</Link>
                            <Link to="/" className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">Chat</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-slate-200 text-slate-600">
                            {localStorage.getItem('firstName')?.[0] || 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
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
            <main className="max-w-5xl p-6 mx-auto">
                <div className="mb-6">
                    <Link to="/admin/requests" className="flex items-center gap-1 mb-2 text-sm text-slate-500 hover:text-slate-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Requests
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">Request #{request.id}</h1>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${request.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            request.status === 'REJECTED' || request.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {request.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Request Details Column */}
                    <div className="col-span-2 space-y-6">
                        {/* Request Info Card */}
                        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">Request Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="mb-1 text-sm text-slate-500">Document Type</p>
                                    <p className="font-medium text-slate-900">{request.documentType}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-slate-500">Date Requested</p>
                                    <p className="font-medium text-slate-900">{new Date(request.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-slate-500">Purpose</p>
                                    <p className="font-medium text-slate-900">{request.purpose || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-slate-500">Delivery Method</p>
                                    <p className="font-medium text-slate-900">
                                        {request.deliveryMethod === 'DIGITAL_DOWNLOAD' ? 'Digital Download' :
                                            request.deliveryMethod === 'IN_PERSON' ? 'In Person' :
                                                request.deliveryMethod}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 mt-6 border-t border-slate-200">
                                <p className="mb-2 text-sm text-slate-500">Additional Notes</p>
                                <p className="p-3 text-sm rounded-lg text-slate-700 bg-slate-50">
                                    {request.additionalNotes || 'No additional notes provided.'}
                                </p>
                            </div>
                        </div>

                        {/* User Info Card */}
                        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">User Information</h2>
                            {request.user ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 text-lg font-medium text-blue-700 bg-blue-100 rounded-full">
                                        {request.user.firstName?.[0] || request.user.email?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            {request.user.firstName && request.user.lastName
                                                ? `${request.user.firstName} ${request.user.lastName}`
                                                : request.user.email || 'Unknown User'}
                                        </p>
                                        <p className="text-sm text-slate-500">{request.user.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-slate-500">
                                    <p>User information not available.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Column */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">Actions</h2>
                            <div className="space-y-3">
                                {request.status === 'PENDING' && (
                                    <button
                                        onClick={() => handleStatusUpdate('PROCESSING')}
                                        disabled={updating}
                                        className="w-full px-4 py-2 font-medium text-blue-700 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
                                    >
                                        Mark as Processing
                                    </button>
                                )}
                                {request.status !== 'COMPLETED' && request.status !== 'REJECTED' && request.status !== 'CANCELLED' && (
                                    <>
                                        {!showCompleteAction && !showRejectAction && (
                                            <>
                                                <button
                                                    onClick={() => setShowCompleteAction(true)}
                                                    disabled={updating}
                                                    className="w-full px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    Complete Request
                                                </button>
                                                <button
                                                    onClick={() => setShowRejectAction(true)}
                                                    disabled={updating}
                                                    className="w-full px-4 py-2 font-medium text-red-700 transition-colors rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50"
                                                >
                                                    Reject Request
                                                </button>
                                            </>
                                        )}

                                        {showCompleteAction && (
                                            <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                                                <h3 className="mb-2 text-sm font-medium text-slate-900">Upload Document</h3>
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    className="w-full mb-3 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleComplete}
                                                        disabled={updating || !selectedFile}
                                                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                    >
                                                        Complete
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowCompleteAction(false);
                                                            setSelectedFile(null);
                                                        }}
                                                        disabled={updating}
                                                        className="px-3 py-2 text-sm font-medium bg-white border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {showRejectAction && (
                                            <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                                                <h3 className="mb-2 text-sm font-medium text-slate-900">Reason for Rejection</h3>
                                                <textarea
                                                    value={rejectionReason}
                                                    onChange={(e) => setRejectionReason(e.target.value)}
                                                    placeholder="Enter reason..."
                                                    className="w-full p-2 mb-3 text-sm border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    rows="3"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleReject}
                                                        disabled={updating || !rejectionReason.trim()}
                                                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowRejectAction(false);
                                                            setRejectionReason('');
                                                        }}
                                                        disabled={updating}
                                                        className="px-3 py-2 text-sm font-medium bg-white border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {(request.status === 'COMPLETED' || request.status === 'REJECTED' || request.status === 'CANCELLED') && (
                                    <p className="text-sm text-center text-slate-500">
                                        No further actions available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminRequestDetails;
