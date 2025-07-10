// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct, getAllProducts } from '../utils/storage';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import RatingStars from '../components/RatingStars';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const { addToCart } = useCart();
    const { user, isLoggedIn } = useUser();

    const fetchProductData = () => {
        const fetchedProduct = getProductById(id);
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            if (isLoggedIn && user && fetchedProduct.reviews) {
                const existingReview = fetchedProduct.reviews.find(review => review.userId === user.username);
                if (existingReview) {
                    setUserRating(existingReview.rating);
                } else {
                    setUserRating(0);
                }
            } else {
                setUserRating(0);
            }
        } else {
            console.error("Produk tidak ditemukan!");
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id, isLoggedIn, user]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert(`${product.name} telah ditambahkan ke keranjang!`);
        }
    };

    const handleRatingChange = (newRating) => {
        if (!isLoggedIn) {
            alert('Anda harus login untuk memberi rating!');
            return;
        }
        if (!product) return;

        setUserRating(newRating);

        const allProducts = getAllProducts();
        const productIndex = allProducts.findIndex(p => p.id === product.id);

        if (productIndex !== -1) {
            const currentProduct = { ...allProducts[productIndex] };
            if (!currentProduct.reviews) {
                currentProduct.reviews = [];
            }

            const existingReviewIndex = currentProduct.reviews.findIndex(r => r.userId === user.username);

            if (existingReviewIndex !== -1) {
                currentProduct.reviews[existingReviewIndex].rating = newRating;
            } else {
                currentProduct.reviews.push({ userId: user.username, rating: newRating, date: new Date().toISOString() });
            }

            updateProduct(currentProduct);
            setProduct(currentProduct);
        }
    };

    const averageRating = product?.reviews && product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;

    if (!product) {
        return <div style={{ textAlign: 'center', padding: '50px', color: `var(--muted-text-color)` }}>Loading product details...</div>;
    }

    return (
        <div className="product-detail-container"> {/* Class ini dari index.css */}
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p className="description">{product.description}</p>
            <p className="price">Harga: Rp{product.price.toLocaleString('id-ID')}</p>

            <div className="rating-section"> {/* Class ini dari index.css */}
                <p>
                    Rating: <span className="rating-value">{averageRating.toFixed(1)}</span> dari 5
                    {product.reviews && product.reviews.length > 0 && (
                        <span className="review-count"> ({product.reviews.length} ulasan)</span>
                    )}
                </p>
                <p>Beri rating produk ini:</p>
                <RatingStars
                    initialRating={userRating}
                    onRatingChange={handleRatingChange}
                    editable={isLoggedIn}
                />
                {!isLoggedIn && (
                    <p style={{ fontSize: '0.9rem', color: `var(--danger-color)`, marginTop: '5px' }}>Login untuk memberi rating.</p>
                )}
            </div>

            <button onClick={handleAddToCart} className="btn btn-secondary">
                Tambah ke Keranjang
            </button>
        </div>
    );
};

export default ProductDetail;