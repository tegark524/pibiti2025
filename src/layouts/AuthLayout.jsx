// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Outlet /> {/* Ini akan merender Login atau Register */}
        </div>
    );
};

export default AuthLayout;