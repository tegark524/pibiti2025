// src/pages/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getAllCategories } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // State untuk form input produk
    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        image: '', // Ini akan tetap untuk URL gambar (jika ada) atau placeholder
        category: '',
        stock: '',
        reviews: []
    });

    // State baru untuk file gambar yang dipilih dan URL pratinjau
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // Untuk menampilkan pratinjau gambar

    useEffect(() => {
        const fetchedCategories = getAllCategories();
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0 && !newProduct.category) {
            setNewProduct(prev => ({ ...prev, category: fetchedCategories[0].slug }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    // Handler untuk input file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Simpan URL data Base64 untuk pratinjau
            };
            reader.readAsDataURL(file); // Baca file sebagai URL data (Base64)
        } else {
            setSelectedFile(null);
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi dasar
        if (!newProduct.name || !newProduct.price || !newProduct.category || newProduct.stock === '') {
            alert('Nama, Harga, Kategori, dan Stok harus diisi!');
            return;
        }
        if (isNaN(newProduct.price) || newProduct.price <= 0) {
            alert('Harga harus angka positif.');
            return;
        }
        if (isNaN(newProduct.stock) || newProduct.stock < 0) {
            alert('Stok harus angka non-negatif.');
            return;
        }

        // PENTING: Untuk project ini, kita TIDAK MENYIMPAN file yang diupload.
        // Properti 'image' di produk akan tetap menggunakan URL (jika diisi) atau default.
        // Jika Anda ingin menggunakan Base64 (TIDAK disarankan untuk banyak gambar/produksi):
        // const imageUrl = previewImage; // Gunakan Base64 sebagai URL gambar jika diupload
        // Jika tidak ada URL dan tidak ada file, berikan URL placeholder atau default
        const imageUrlToSave = newProduct.image || (previewImage ? previewImage : 'https://via.placeholder.com/300x200?text=No+Image');


        const productToAdd = { ...newProduct, id: uuidv4(), image: imageUrlToSave };

        addProduct(productToAdd);
        alert('Produk berhasil ditambahkan! (Gambar yang diupload tidak disimpan secara persisten)');
        navigate('/');
    };

    return (
        <div className="form-container">
            <h1>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nama Produk:</label>
                    <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Deskripsi:</label>
                    <textarea id="description" name="description" value={newProduct.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Harga (Rp):</label>
                    <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} required min="0" />
                </div>

                {/* ----- Bagian Unggah Gambar Baru ----- */}
                <div className="form-group">
                    <label htmlFor="imageFile">Unggah Gambar (Preview Saja):</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*" // Hanya menerima file gambar
                        onChange={handleFileChange}
                    />
                    {previewImage && (
                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                            <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <p style={{ fontSize: '0.85rem', color: `var(--muted-text-color)`, marginTop: '5px' }}>Pratinjau gambar yang dipilih. Tidak akan disimpan.</p>
                        </div>
                    )}
                </div>
                {/* ----- Akhir Bagian Unggah Gambar ----- */}

                {/* ----- Input URL Gambar (opsional, jika ingin tetap bisa paste URL) ----- */}
                <div className="form-group">
                    <label htmlFor="imageUrl">Atau masukkan URL Gambar:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="image" // Name harus "image" agar handleChange tetap bekerja
                        value={newProduct.image}
                        onChange={handleChange}
                        placeholder="Misal: https://example.com/gambar.jpg"
                    />
                    {!previewImage && !newProduct.image && (
                        <p style={{ fontSize: '0.85rem', color: `var(--muted-text-color)`, marginTop: '5px' }}>Jika tidak diisi dan tidak ada file diunggah, akan menggunakan placeholder.</p>
                    )}
                </div>
                {/* ----- Akhir Input URL Gambar ----- */}

                <div className="form-group">
                    <label htmlFor="category">Kategori:</label>
                    <select id="category" name="category" value={newProduct.category} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stok:</label>
                    <input type="number" id="stock" name="stock" value={newProduct.stock} onChange={handleChange} required min="0" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Tambahkan Produk
                </button>
            </form>
        </div>
    );
};

export default AddProduct;