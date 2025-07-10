// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Tambahkan prop requireUserRole
const ProtectedRoute = ({ children, adminOnly = false, requireUserRole = false }) => {
    const { isLoggedIn, isAdmin } = useUser();

    if (!isLoggedIn) {
        // Jika tidak login, redirect ke halaman login
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        // Jika hanya admin yang boleh akses tapi user bukan admin, redirect ke home
        return <Navigate to="/" replace />;
    }

    // Jika requireUserRole=true, pastikan user BUKAN admin
    // Ini untuk melindungi rute user biasa dari akses admin
    if (requireUserRole && isAdmin) {
        return <Navigate to="/" replace />; // Admin tidak bisa akses rute user biasa
    }

    // Jika semua kondisi terpenuhi, tampilkan konten
    return children ? children : <Outlet />;
};

export default ProtectedRoute;