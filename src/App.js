import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
// Components
import Nav from './components/Nav';
import Cart from './components/Cart';
// Context
import UserContext from './context/UserContext';
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
  const [guestCart, setGuestCart] = useState([]);
  const [user, setUser] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const fetchProducts = useCallback(
    async () => {
      try {
        const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/collection/all');
        setProducts(response);
      }
      catch (error) {
        console.error(error)
      }
    }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-backnd.herokuapp.com/api/v1/categories');
      setCategories(response);
    }
    catch (error) {
      console.error(error)
    }
  }

  const options = {
    method: 'GET',
    url: 'https://ecommerce-backnd.herokuapp.com/api/v1/cart',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${user[0]?.token}`
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.request(options);
      setCart(response);
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser}}>
        <Nav cart={cart}
          cartVisible={cartVisible}
          guestCart={guestCart}
          fetchCart={fetchCart}
          setUser={setUser}
          setCartVisible={setCartVisible} />{
          cartVisible ?
            <Cart cart={cart}
              cartVisible={cartVisible}
              fetchCart={fetchCart}
              setCartVisible={setCartVisible}
              setGuestCart={setGuestCart} />
            : null
        }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='collection' element={<Products
            products={products}
            categories={categories}
            fetchProducts={fetchProducts}
            fetchCategories={fetchCategories}
            setProductSelected={setProductSelected}
          />} />
          <Route path='/product/:name' element={<SingleItem
            productSelected={productSelected}
            fetchCart={fetchCart}
            setGuestCart={setGuestCart}
          />} />
          <Route path='admin' element={
            <Admin
              products={products}
              fetchProducts={fetchProducts}
              categories={categories}
              fetchCategories={fetchCategories}
            />} />
          {/* <Route path='cart' element={<Cart  cart={cart} fetchCart={fetchCart}/>}/> */}
          <Route path='login' element={<LogIn />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </UserContext.Provider>

    </>
  );
}

export default App;

