import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
// CSS
import './nav.css'

const Nav = ({ cart, guestCart, cartVisible, fetchCart, setUser, setCartVisible }) => {

  const [price, setPrice] = useState(0)
  const [toggleHidden, setToggleHidden] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
  }, [guestCart]);

  // USER
  const user = useContext(UserContext)
  const isEmpty = (user) => {
    return Object.keys(user).length === 0;
  }
  let emptyUserObj = isEmpty(user.user);

  // GUEST CART
  let guestCartItems = JSON.parse(localStorage.getItem("cart"))
  const guestCartQuantity = guestCartItems?.length
  const guestCartTotalPrice = guestCartItems?.map(item => (
    item.products_id.price
  ));

  // USER CART
  const cartQuantity = cart?.data?.length
  const cartTotalPrice = cart?.map(item => (
    item.products_id.price
  ));

  // TOTAL PRICE
  let intialPrice = 0;
  setTimeout(() => {
    if (emptyUserObj) {
      setPrice(guestCartTotalPrice?.reduce((i, j) => i + j, intialPrice));
    }
    else {
      setPrice(cartTotalPrice?.reduce((i, j) => i + j, intialPrice));
    }
  }, 50);

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 nav-container min-h-13 text-lg'>
        <div className='max-w-6x1 mx-auto px-3'>
          <div className='flex justify-around'>
            <Link className='hidden md:flex py-4 hover:text-red-600' to='/'>HOME</Link>
            <Link className='hidden md:flex py-4' to='collection'>SHOP</Link>
            {
              user.user.username == 'admin' ?
                <Link className='hidden md:flex py-4' to='admin'>ADMIN</Link>
                : null
            }
            {
              !emptyUserObj ? <>
                <div className='hidden md:flex py-4' onClick={() => setUser([])}>Log Out || {user?.user[0]?.username}</div>
                <Link className='hidden md:flex py-4' to='profile'>PROFILE</Link>
              </>

                :
                <>
                  <Link className='hidden md:flex py-4' to='login'>ACCOUNT</Link>
                  {/* <Link className='hidden md:flex py-4' to='signup'>Sign Up</Link> */}
                </>
            }
            <div className='py-4' onClick={() => setCartVisible(!cartVisible)}>CART {price} USD ({emptyUserObj ? guestCartQuantity : cartQuantity} ITEM)</div>

            <div className='md:hidden flex items-center'>
              <button className='mobile-menu-button' onClick={() => setToggleHidden(!toggleHidden)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
        {
          toggleHidden ?
            <div className='mobile-menu md:hidden flex-col items-center'>
              <Link className='block py-2 hover:text-red-600' to='/' onClick={() => setToggleHidden(!toggleHidden)}>Home</Link>
              <Link className='block py-2' to='collection' onClick={() => setToggleHidden(!toggleHidden)}>Shop</Link>
              {
                user.user.username == 'admin' ?
                  <Link className='block py-2' to='admin' onClick={() => setToggleHidden(!toggleHidden)}>Admin</Link>
                  : null
              }
              {
                !emptyUserObj ? <div className='block py-4' onClick={() => setUser({})}>Log Out || {user.user.username}</div>
                  :
                  <>
                    <Link className='block py-2' to='login' onClick={() => setToggleHidden(!toggleHidden)}>ACCOUNT</Link>
                    {/* <Link className='block py-2' to='signup' onClick={() => setToggleHidden(!toggleHidden)}>Sign Up</Link> */}
                  </>
              }
            </div>
            :
            null
        }

      </nav>
    </>

  );
}

export default Nav;
