// src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, getAllCategories } from '../utils/storage';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        image: '', // Akan diisi dengan URL gambar dari produk yang ada
        category: '',
        stock: '',
        reviews: []
    });
    const [loading, setLoading] = useState(true);

    // State baru untuk file gambar yang dipilih dan URL pratinjau
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // Untuk menampilkan pratinjau gambar

    useEffect(() => {
        const fetchedCategories = getAllCategories();
        setCategories(fetchedCategories);

        const foundProduct = getProductById(id);
        if (foundProduct) {
            setProduct(foundProduct);
            // Jika produk sudah punya gambar, gunakan sebagai pratinjau awal
            setPreviewImage(foundProduct.image);
        } else {
            alert('Produk tidak ditemukan!');
            navigate('/');
        }
        setLoading(false);
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
        // Jika user mengedit URL gambar secara manual, reset pratinjau file
        if (name === 'image') {
            setSelectedFile(null);
            // setPreviewImage(value); // Tidak perlu karena akan otomatis dari URL yang diinput
        }
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
            setProduct(prev => ({ ...prev, image: '' })); // Kosongkan input URL jika ada file yang dipilih
        } else {
            setSelectedFile(null);
            // Jika file dihapus, kembali ke gambar asli produk atau kosongkan pratinjau
            setPreviewImage(product.image); // Kembali ke gambar produk yang tersimpan
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi dasar
        if (!product.name || !product.price || !product.category || product.stock === '') {
            alert('Nama, Harga, Kategori, dan Stok harus diisi!');
            return;
        }
        if (isNaN(product.price) || product.price <= 0) {
            alert('Harga harus angka positif.');
            return;
        }
        if (isNaN(product.stock) || product.stock < 0) {
            alert('Stok harus angka non-negatif.');
            return;
        }

        // PENTING: Untuk project ini, kita TIDAK MENYIMPAN file yang diupload.
        // Properti 'image' di produk akan tetap menggunakan URL yang ada di input manual
        // atau Base64 dari pratinjau (jika ada file dipilih), atau placeholder.
        let imageUrlToSave;
        if (product.image) { // Jika ada URL yang dimasukkan secara manual
            imageUrlToSave = product.image;
        } else if (previewImage) { // Jika ada gambar yang diupload (Base64)
            imageUrlToSave = previewImage;
        } else { // Jika tidak ada keduanya
            imageUrlToSave = 'https://via.placeholder.com/300x200?text=No+Image';
        }

        const updatedProduct = { ...product, image: imageUrlToSave };

        updateProduct(updatedProduct);
        alert('Produk berhasil diperbarui! (Gambar yang diupload tidak disimpan secara persisten)');
        navigate('/');
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: `var(--muted-text-color)` }}>Loading product data...</div>;
    }

    return (
        <div className="form-container">
            <h1>Edit Produk: {product.name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nama Produk:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Deskripsi:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Harga (Rp):</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required min="0" />
                </div>

                {/* ----- Bagian Unggah Gambar Baru ----- */}
                <div className="form-group">
                    <label htmlFor="imageFile">Unggah Gambar Baru (Preview Saja):</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
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

                {/* ----- Input URL Gambar (Opsional, akan diisi jika ada URL di produk) ----- */}
                <div className="form-group">
                    <label htmlFor="imageUrl">Atau masukkan URL Gambar:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="image" // Name harus "image" agar handleChange tetap bekerja
                        value={product.image}
                        onChange={handleChange}
                        placeholder="Misal: https://example.com/gambar.jpg"
                    />
                    {!previewImage && !product.image && (
                        <p style={{ fontSize: '0.85rem', color: `var(--muted-text-color)`, marginTop: '5px' }}>Jika tidak diisi dan tidak ada file diunggah, akan menggunakan placeholder.</p>
                    )}
                </div>
                {/* ----- Akhir Input URL Gambar ----- */}

                <div className="form-group">
                    <label htmlFor="category">Kategori:</label>
                    <select id="category" name="category" value={product.category} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stok:</label>
                    <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} required min="0" />
                </div>
                <button type="submit" className="btn btn-secondary" style={{ marginTop: '20px' }}>
                    Perbarui Produk
                </button>
            </form>
        </div>
    );
};

export default EditProduct;