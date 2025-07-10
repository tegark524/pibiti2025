// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
    const { user, isLoggedIn } = useUser();

    if (!isLoggedIn || !user) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: `var(--danger-color)`, fontSize: '1.2rem' }}>
                Anda harus login untuk melihat profil.
            </div>
        );
    }

    return (
        <div className="form-container"> {/* Menggunakan form-container sebagai gaya dasar */}
            <h1>Profil Pengguna</h1>
            <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '8px', color: `var(--text-color)` }}>
                    <strong>Username:</strong> {user.username}
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '8px', color: `var(--text-color)` }}>
                    <strong>Peran:</strong> {user.role === 'admin' ? 'Administrator' : 'Pengguna Biasa'}
                </p>
            </div>
        </div>
    );
};

export default Profile;