import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar siteTitle="Rasa Nusantara E-commerce" /> {/* Meneruskan prop siteTitle */}
      <HeroSection />
      <div className="main-content">
        <CategoryFilter />
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}

export default App;