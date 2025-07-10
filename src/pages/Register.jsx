// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { addUser } from '../utils/storage';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Username dan password harus diisi.');
            return;
        }

        const newUser = { username, password, role: 'user' };
        const success = addUser(newUser);

        if (success) {
            login(newUser);
            alert(`Registrasi ${username} berhasil! Anda akan langsung login.`);
            navigate('/');
        } else {
            alert('Username sudah ada. Mohon gunakan username lain.');
        }
    };

    return (
        <div className="form-container"> {/* Class ini dari index.css */}
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="regUsername">Username:</label>
                    <input type="text" id="regUsername" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="regPassword">Password:</label>
                    <input type="password" id="regPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-secondary" style={{ marginTop: '20px' }}>
                    Register
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', color: `var(--muted-text-color)` }}>
                Sudah punya akun? <Link to="/login" className="btn-link">Login di sini</Link>
            </p>
        </div>
    );
};

export default Register;