// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="search-bar-container"> {/* Class ini dari index.css */}
            <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Semua Kategori</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar;