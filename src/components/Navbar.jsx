// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isLoggedIn, isAdmin, logout } = useUser();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav style={{
            background: theme === 'dark' ? '#333' : '#f8f8f8',
            color: theme === 'dark' ? '#fff' : '#333',
            padding: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}> {/* Hapus display:flex, justify-content, align-items dari sini */}
            <div className="logo">
                <Link to="/" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    UMKM Ngawi Store
                </Link>
            </div>
            <div className="nav-links"> {/* TAMBAHKAN CLASS 'nav-links' */}
                <Link to="/" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Home</Link>

                {/* Link Kategori (dropdown sederhana) - biarkan ini dulu kalau kemarin di-hapus */}
                {/* Jika kamu menghapus ini sepenuhnya, abaikan bagian ini */}
                {/*
        <div className="category-dropdown">
          <span style={{ cursor: 'pointer', color: theme === 'dark' ? '#fff' : '#333' }}>Kategori &#9662;</span>
          <div className="dropdown-content" style={{
            backgroundColor: theme === 'dark' ? '#444' : '#f9f9f9',
            color: theme === 'dark' ? '#eee' : '#333' // Tambahkan warna teks default untuk dropdown
          }}>
            {/* ... link kategori di sini ... }
          </div>
        </div>
        */}


                {/* Link Keranjang hanya untuk user biasa atau sebelum login */}
                {!isAdmin && (
                    <Link to="/cart" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Keranjang</Link>
                )}

                {/* Link Tambah Produk hanya untuk admin */}
                {isAdmin && (
                    <Link to="/add-product" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Tambah Produk</Link>
                )}

                {/* Tombol Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none',
                        border: '1px solid',
                        borderColor: theme === 'dark' ? '#fff' : '#333',
                        color: theme === 'dark' ? '#fff' : '#333',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '20px',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                    }}
                >
                    Beralih ke {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>

                {/* Tampilkan Login/Register atau Logout */}
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Profil</Link>
                        <button
                            onClick={logout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: theme === 'dark' ? '#fff' : '#333',
                                cursor: 'pointer',
                                marginLeft: '20px',
                                fontSize: '1rem',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                transition: 'color 0.3s ease'
                            }}
                            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Login</Link>
                        <Link to="/register" style={{ color: theme === 'dark' ? '#fff' : '#333', textDecoration: 'none', marginLeft: '20px' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;