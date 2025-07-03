import React from 'react';
import './ProductCard.css';

function ProductCard({ name, category, price, imageUrl }) { // Menerima props
    return (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" />
            <h3 className="product-name">{name}</h3>
            <p className="product-category">Kategori: {category}</p>
            <p className="product-price">{price}</p>
            <button className="add-to-cart-button">Tambah ke Keranjang</button>
        </div>
    );
}

export default ProductCard;