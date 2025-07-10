// src/components/Footer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme untuk menyesuaikan warna

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer style={{
            backgroundColor: theme === 'dark' ? '#333' : '#1a202c', /* Warna gelap untuk footer */
            color: '#fff',
            padding: '1rem',
            textAlign: 'center',
            marginTop: 'auto',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
        }}>
            <p>&copy; 2024 UMKM Ngawi Store. All rights reserved.</p>
        </footer>
    );
};

export default Footer;