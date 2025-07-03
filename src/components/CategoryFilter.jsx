import React from 'react';
import './CategoryFilter.css';

function CategoryFilter() {
    return (
        <div className="category-filter">
            <h3>Filter Kategori</h3>
            <ul>
                <li><a href="#makanan">Makanan Ringan</a></li>
                <li><a href="#minuman">Minuman Khas</a></li>
                <li><a href="#kerajinan">Kerajinan Tangan</a></li>
                <li><a href="#batik">Batik</a></li>
                <li><a href="#kopi">Kopi</a></li>
            </ul>
        </div>
    );
}

export default CategoryFilter;