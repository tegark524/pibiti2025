// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Membuat context baru
const CartContext = createContext();

// Provider untuk CartContext
export const CartProvider = ({ children }) => {
    // State untuk menyimpan item di keranjang
    // Inisialisasi dari localStorage, jika ada. Jika tidak, array kosong.
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCart = localStorage.getItem('cartItems');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error("Failed to parse cartItems from localStorage:", error);
            return [];
        }
    });

    // useEffect untuk menyimpan cartItems ke localStorage setiap kali berubah
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fungsi untuk menambah item ke keranjang
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                // Jika produk sudah ada, tambahkan kuantitasnya
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Jika produk belum ada, tambahkan sebagai item baru dengan kuantitas 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Fungsi untuk mengurangi kuantitas item di keranjang
    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Hapus item jika kuantitasnya 0
        });
    };

    // Fungsi untuk menghapus item dari keranjang
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    // Fungsi untuk menghitung total harga keranjang
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook untuk memudahkan penggunaan CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};