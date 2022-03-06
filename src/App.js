import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
// Components
import Nav from './components/Nav';
import Cart from './components/Cart';
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import SingleItem from './pages/SingleItem';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Admin from './pages/Admin';
// CSS
import './App.css';

const App = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [productSelected, setProductSelected ] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/collection/all');
      setProducts(response);
    }
    catch (error) {
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/categories');
      setCategories(response);
    }
    catch (error) {
      console.error(error)
    }
  }

  const fetchCart = async () => {
    try {
        const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/cart');
        setCart(response);
    } 
    catch (error) {
      console.error(error)
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
          <Route path='cart' element={<Cart  cart={cart} fetchCart={fetchCart}/>}/>
          <Route path='login' element={<LogIn />}/>
          <Route path='signup' element={<SignUp />}/>
      </Routes>
    </div>
  );
}

export default App;

