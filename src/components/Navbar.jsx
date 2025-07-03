import React from 'react';
import './Navbar.css';

function Navbar({ siteTitle }) { // Menerima prop siteTitle
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>{siteTitle}</h1> {/* Menggunakan prop di sini */}
            </div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Produk</a></li>
                <li><a href="#categories">Kategori</a></li>
                <li><a href="#about">Tentang Kami</a></li>
            </ul>
            <div className="navbar-icons">
                <input type="text" placeholder="Cari produk..." className="search-input" />
                <button className="cart-button">Keranjang (0)</button>
            </div>
        </nav>
    );
}

export default Navbar;