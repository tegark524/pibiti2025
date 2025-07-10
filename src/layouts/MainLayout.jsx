// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Akan kita buat selanjutnya
import Footer from '../components/Footer'; // Akan kita buat selanjutnya

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Outlet /> {/* Outlet akan merender komponen halaman yang sesuai dengan rute */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;