// src/pages/CategoryProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../utils/storage';
import ProductCard from '../components/ProductCard';

const CategoryProduct = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const allProducts = getAllProducts();
        const allCategories = getAllCategories();

        const foundCategory = allCategories.find(cat => cat.slug === slug);
        if (foundCategory) {
            setCategoryName(foundCategory.name);
            const filtered = allProducts.filter(product => product.category === slug);
            setProducts(filtered);
        } else {
            setCategoryName('Kategori Tidak Ditemukan');
            setProducts([]);
        }
        setLoading(false);
    }, [slug]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: `var(--muted-text-color)` }}>Memuat produk kategori...</div>;
    }

    return (
        <div className="container"> {/* Class ini dari index.css */}
            <h1 className="section-title">
                Produk Kategori: {categoryName}
            </h1>

            {products.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: `var(--muted-text-color)` }}>Tidak ada produk di kategori ini.</p>
            ) : (
                <div className="product-grid"> {/* Class ini dari index.css */}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Link to="/" className="btn btn-outline">
                    Kembali ke Semua Produk
                </Link>
            </div>
        </div>
    );
};

export default CategoryProduct;