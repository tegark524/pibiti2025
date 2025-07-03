import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
    const products = [
        {
            id: 1,
            name: "Keripik Singkong Balado",
            category: "Makanan Ringan",
            price: "Rp 15.000",
            imageUrl: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Keripik"
        },
        {
            id: 2,
            name: "Batik Motif Parang",
            category: "Batik",
            price: "Rp 150.000",
            imageUrl: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Batik"
        },
        {
            id: 3,
            name: "Kopi Gayo Arabica",
            category: "Kopi",
            price: "Rp 50.000",
            imageUrl: "https://via.placeholder.com/150/3357FF/FFFFFF?text=Kopi"
        },
        {
            id: 4,
            name: "Anyaman Bambu",
            category: "Kerajinan Tangan",
            price: "Rp 75.000",
            imageUrl: "https://via.placeholder.com/150/FF33A1/FFFFFF?text=Anyaman"
        },
    ];

    return (
        <section className="product-list-section">
            <h2>Produk Terbaru</h2>
            <div className="product-grid"> {/* Pastikan class ini ada */}
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;