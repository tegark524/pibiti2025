// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadInitialProducts, loadInitialCategories, loadInitialUsers } from './utils/storage';

// Import Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Import Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import CategoryProduct from './pages/CategoryProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Import ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';
// HAPUS BARIS INI (import useUser dari 'react-router-dom')
// import { useUser } = 'react-router-dom'; // <--- BARIS INI YANG SALAH DAN HARUS DIHAPUS

import { useUser } from './context/UserContext'; // <-- BARIS INI YANG BENAR

function App() {
  useEffect(() => {
    loadInitialProducts();
    loadInitialCategories();
    loadInitialUsers();
    console.log('Initial data loaded into localStorage!');
  }, []);

  const { isAdmin } = useUser(); // Ini akan menggunakan useUser yang benar dari UserContext

  return (
    <Router>
      <Routes>
        {/* Rute Umum (Home, Detail Produk, Kategori) - Bisa diakses siapa saja */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="category/:slug" element={<CategoryProduct />} />
        </Route>

        {/* Rute Khusus PENGGUNA BIASA (membutuhkan login dan BUKAN ADMIN) */}
        <Route element={<ProtectedRoute requireUserRole={true} />}>
          <Route path="cart" element={<MainLayout />}>
            <Route index element={<Cart />} />
          </Route>
        </Route>

        {/* Rute yang membutuhkan login (untuk semua role) */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<MainLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>

        {/* Rute Khusus ADMIN (membutuhkan login dan role admin) */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
        </Route>

        {/* Rute untuk otentikasi menggunakan AuthLayout */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Tambahkan rute 404 jika diperlukan */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;