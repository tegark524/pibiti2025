// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getUserByUsername } from '../utils/storage';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = getUserByUsername(username);

        if (foundUser && foundUser.password === password) {
            login({ username: foundUser.username, role: foundUser.role });
            alert(`Login sebagai ${foundUser.username} berhasil!`);
            navigate('/');
        } else {
            alert('Username atau password salah.');
        }
    };

    return (
        <div className="form-container"> {/* Class ini dari index.css */}
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', color: `var(--muted-text-color)` }}>
                Belum punya akun? <Link to="/register" className="btn-link">Daftar di sini</Link>
            </p>
        </div>
    );
};

export default Login;