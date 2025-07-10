// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, getTotalPrice } = useCart();
    const { isAdmin } = useUser();

    return (
        <div className="cart-container"> {/* Class ini dari index.css */}
            <h1 className="section-title">Keranjang Belanja Anda</h1>

            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: `var(--muted-text-color)` }}>Keranjang Anda kosong.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item"> {/* Class ini dari index.css */}
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-info"> {/* Class ini dari index.css */}
                                <h3>{item.name}</h3>
                                <p style={{ color: `var(--muted-text-color)` }}>Harga Satuan: Rp{item.price.toLocaleString('id-ID')}</p>
                                <div className="cart-item-actions"> {/* Class ini dari index.css */}
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="btn btn-danger"
                                    >
                                        -
                                    </button>
                                    <span className="cart-item-quantity">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="btn btn-secondary"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="btn btn-outline"
                                        style={{ marginLeft: '1rem', borderColor: `var(--muted-text-color)`, color: `var(--muted-text-color)` }}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item-total"> {/* Class ini dari index.css */}
                                <p>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary"> {/* Class ini dari index.css */}
                        <h2>
                            Total Harga: Rp{getTotalPrice().toLocaleString('id-ID')}
                        </h2>
                        {!isAdmin && (
                            <button className="btn btn-primary" style={{ marginTop: '20px' }}>
                                Checkout (Dummy)
                            </button>
                        )}
                        {isAdmin && (
                            <p style={{ color: `var(--danger-color)`, marginTop: '10px' }}>Admin tidak dapat melakukan checkout.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;