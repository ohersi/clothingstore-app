import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
// Components
import Nav from './components/Nav';
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
// CSS
import './App.css';

const App = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/collection/all');
      setProducts(response);
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Nav />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products products={products} fetchProducts={fetchProducts}/>} />
        <Route path='admin' element={<Admin products={products} fetchProducts={fetchProducts} />} />
      </Routes>
    </div>
  );
}

export default App;

