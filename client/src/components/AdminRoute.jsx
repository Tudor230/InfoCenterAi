import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decoded = JSON.parse(jsonPayload);
            const exp = decoded.exp;
            const now = Date.now() / 1000;
            return exp < now;
        } catch (e) {
            return true;
        }
    };

    useEffect(() => {
        const checkAdmin = async () => {
            if (!token || isTokenExpired(token)) {
                setIsLoading(false);
                return;
            }

            try {
                // Assuming there is an endpoint to get the current user's details
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
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

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
