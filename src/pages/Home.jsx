// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { getAllProducts, deleteProduct, getAllCategories } from '../utils/storage';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const { isAdmin } = useUser();
    const navigate = useNavigate();

    const fetchAllData = () => {
        const fetchedProducts = getAllProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        const fetchedCategories = getAllCategories();
        setCategories(fetchedCategories);
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        let currentProducts = products;

        if (selectedCategory) {
            currentProducts = currentProducts.filter(
                (product) => product.category === selectedCategory
            );
        }

        if (searchTerm) {
            currentProducts = currentProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(currentProducts);
    }, [searchTerm, selectedCategory, products]);

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            deleteProduct(productId);
            fetchAllData();
            alert('Produk berhasil dihapus!');
        }
    };

    // --- Admin Home View ---
    if (isAdmin) {
        return (
            <div className="container"> {/* Menggunakan class container dari index.css */}
                <h1 className="section-title">Manajemen Produk (Admin Dashboard)</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                    <Link to="/add-product" className="btn btn-primary">
                        + Tambah Produk Baru
                    </Link>
                </div>

                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: `var(--muted-text-color)` }}>Belum ada produk.</p>
                ) : (
                    <div className="admin-table-container"> {/* Class ini dari index.css */}
                        <table className="admin-product-table"> {/* Class ini dari index.css */}
                            <thead>
                                <tr>
                                    <th>Gambar</th>
                                    <th>Nama Produk</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th style={{ textAlign: 'center' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <img src={product.image} alt={product.name} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>Rp{product.price.toLocaleString('id-ID')}</td>
                                        <td>{product.stock}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button onClick={() => navigate(`/edit-product/${product.id}`)} className="btn btn-warning" style={{ fontSize: '0.8rem', padding: '6px 10px', marginRight: '8px' }}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '6px 10px' }}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    // --- User Home View ---
    return (
        <div className="container">
            <h1 className="section-title">Produk UMKM Ngawi</h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: `var(--muted-text-color)` }}>Tidak ada produk yang ditemukan.</p>
            ) : (
                <div className="product-grid"> {/* Class ini dari index.css */}
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;