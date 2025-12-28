import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkAdmin = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                // Assuming there is an endpoint to get the current user's details
                const response = await fetch('http://localhost:8080/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Check if the role is ADMIN
                    if (data.role === 'ADMIN') {
                        setIsAdmin(true);
                    }
                }
            } catch (error) {
                console.error('Failed to verify admin status', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
