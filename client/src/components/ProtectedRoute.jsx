import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
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

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
