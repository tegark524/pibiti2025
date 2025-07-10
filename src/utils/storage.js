// src/utils/storage.js
import defaultProductsData from '../data/products.json'; // IMPOR LANGSUNG
import defaultCategoriesData from '../data/categories.json'; // IMPOR LANGSUNG

// Fungsi untuk memuat semua produk dari localStorage, jika ada.
// Jika belum ada, gunakan data dari products.json sebagai default.
export const loadInitialProducts = () => {
    let products = JSON.parse(localStorage.getItem('products'));
    if (!products || products.length === 0) {
        localStorage.setItem('products', JSON.stringify(defaultProductsData));
        products = defaultProductsData;
    }
    return products;
};

export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const getAllProducts = () => {
    return JSON.parse(localStorage.getItem('products') || '[]');
};

export const getProductById = (id) => {
    const products = getAllProducts();
    return products.find(product => product.id === id);
};

export const addProduct = (newProduct) => {
    const products = getAllProducts();
    products.push(newProduct);
    saveProducts(products);
};

export const updateProduct = (updatedProduct) => {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        saveProducts(products);
        return true;
    }
    return false;
};

export const deleteProduct = (id) => {
    let products = getAllProducts();
    products = products.filter(product => product.id !== id);
    saveProducts(products);
};

// --- Fungsi untuk Kategori (sudah ada) ---
// ... (biarkan kode kategori yang sudah ada di sini) ...

export const loadInitialCategories = () => {
    let categories = JSON.parse(localStorage.getItem('categories'));
    if (!categories || categories.length === 0) {
        localStorage.setItem('categories', JSON.stringify(defaultCategoriesData));
        categories = defaultCategoriesData;
    }
    return categories;
};

export const getAllCategories = () => {
    return JSON.parse(localStorage.getItem('categories') || '[]');
};

// --- Fungsi BARU untuk Pengguna ---

// Data user awal (ini akan menjadi default jika localStorage kosong)
const defaultUsersData = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' }
];

// Fungsi untuk memuat semua user dari localStorage, jika ada.
// Jika belum ada, gunakan data defaultUsersData sebagai default.
export const loadInitialUsers = () => {
    console.log('DEBUG: loadInitialUsers() called'); // Log saat fungsi dipanggil
    let users = JSON.parse(localStorage.getItem('users'));
    console.log('DEBUG: Users from localStorage initially:', users); // Log apa yang ditemukan di localStorage

    if (!users || users.length === 0) {
        console.log('DEBUG: localStorage "users" is empty or null. Loading default users.');
        localStorage.setItem('users', JSON.stringify(defaultUsersData));
        users = defaultUsersData;
        console.log('DEBUG: Default users saved to localStorage:', users); // Log apa yang disimpan
    }
    return users;
};
// Fungsi untuk menyimpan semua user ke localStorage
export const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Fungsi untuk mendapatkan semua user
export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
};

// Fungsi untuk mencari user berdasarkan username
export const getUserByUsername = (username) => {
    const users = getAllUsers();
    return users.find(user => user.username === username);
};

// Fungsi untuk menambahkan user baru
export const addUser = (newUser) => {
    const users = getAllUsers();
    // Pastikan username belum ada
    if (users.find(user => user.username === newUser.username)) {
        return false; // Username sudah ada
    }
    users.push(newUser);
    saveUsers(users);
    return true;
};

