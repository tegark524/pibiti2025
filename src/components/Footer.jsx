import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2025 Rasa Nusantara. Semua Hak Dilindungi.</p>
            <div className="footer-links">
                <a href="#privacy">Kebijakan Privasi</a>
                <a href="#terms">Syarat & Ketentuan</a>
                <a href="#contact">Kontak Kami</a>
            </div>
        </footer>
    );
}

export default Footer;