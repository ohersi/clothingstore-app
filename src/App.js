import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
// Components
import Nav from './components/Nav';
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import SingleItem from './pages/SingleItem';
import Admin from './pages/Admin';
// CSS
import './App.css';

const App = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productSelected, setProductSelected ] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/collection/all');
      setProducts(response);
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/categories');
      setCategories(response);
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
        <Route path='collection' element={<Products
          products={products}
          categories={categories}
          fetchProducts={fetchProducts}
          fetchCategories={fetchCategories}
          setProductSelected={setProductSelected}
        />} />
        <Route path='/product/:name' element={<SingleItem productSelected={productSelected}/>} />
        <Route path='admin' element={
          <Admin
            products={products}
            fetchProducts={fetchProducts}
            categories={categories}
            fetchCategories={fetchCategories}
          />} />
      </Routes>
    </div>
  );
}

export default App;

