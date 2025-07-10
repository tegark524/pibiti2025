// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData); // userData seharusnya { username: '...', role: '...' }
    };

    const logout = () => {
        setUser(null);
    };

    const isLoggedIn = !!user; // Mengatur apakah ada user yang login
    // PASTIKAN BARIS INI BENAR
    const isAdmin = user && user.role === 'admin'; // Periksa role 'admin'

    return (
        <UserContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};