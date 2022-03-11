import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
// CSS
import './nav.css'

const Nav = ({ cart, cartVisible, fetchCart, setUser, setCartVisible }) => {

  //TODO - Display either Login or Sign Up component based on whether user is logged in
  const [price, setPrice] = useState(0)
  const [toggleHidden, setToggleHidden] = useState(false);
  useEffect(() => {
    fetchCart();
  }, []);

  const user = useContext(UserContext)
  const cartQuantity = cart?.data?.length
  const cartTotalPrice = cart?.data?.map(item => (
    item.products_id.price
  ));

  let intialPrice = 0;
  setTimeout(() => {
    setPrice(cartTotalPrice?.reduce((i, j) => i + j, intialPrice))
  }, 50);

  const isEmpty = (user) => {
    return Object.keys(user).length === 0;
  }
  let emptyUserObj = isEmpty(user.user)
  console.log(cartVisible)
  return (
    <>
      <nav className='fixed top-0 left-0 right-0 nav-container min-h-13 text-lg'>
        <div className='max-w-6x1 mx-auto px-3'>
          <div className='flex justify-around'>
            <Link className='hidden md:flex py-4 hover:text-red-600' to='/'>LOGO</Link>
            <Link className='hidden md:flex py-4' to='collection'>SHOP</Link>
            {
              user.user.username == 'admin' ?
                <Link className='hidden md:flex py-4' to='admin'>ADMIN</Link>
                : null
            }
            {
              !emptyUserObj ? <div className='hidden md:flex py-4' onClick={() => setUser({})}>Log Out || {user.user.username}</div>
                :
                <>
                  <Link className='hidden md:flex py-4' to='login'>ACCOUNT</Link>
                  {/* <Link className='hidden md:flex py-4' to='signup'>Sign Up</Link> */}
                </>
            }
            <div className='py-4' onClick={() => setCartVisible(!cartVisible)}>CART {price} USD ({cartQuantity} ITEM)</div>

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
              <Link className='block py-2' to='admin' onClick={() => setToggleHidden(!toggleHidden)}>Admin</Link>
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
