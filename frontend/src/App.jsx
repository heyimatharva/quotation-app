import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Quotations from './pages/Quotations';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails.jsx';
import Quotation from './pages/Quotation.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <h1>
          
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/quotations" element={<Quotations />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/quotation" element={<Quotation />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

