// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars'; // Path ini sudah benar

const ProductCard = ({ product }) => {
    const averageRating = product.reviews && product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
    const displayRating = averageRating.toFixed(1);

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p style={{ color: `var(--muted-text-color)` }}>Rp{product.price.toLocaleString('id-ID')}</p>

            <div className="rating-info">
                <RatingStars initialRating={averageRating} editable={false} />
                {product.reviews && product.reviews.length > 0 && (
                    <span>
                        ({displayRating} dari {product.reviews.length} ulasan)
                    </span>
                )}
            </div>

            <Link to={`/product/${product.id}`} className="btn btn-primary" style={{ marginTop: 'auto' }}>
                Lihat Detail
            </Link>
        </div>
    );
};

export default ProductCard;