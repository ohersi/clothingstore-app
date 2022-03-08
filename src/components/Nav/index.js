import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';

const Nav = ({ cart, fetchCart }) => {

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
    setPrice(cartTotalPrice.reduce((i, j) => i + j, intialPrice))
  }, 50);

  return (
    <>
      <nav className='bg-black'>
        <div className='max-w-6x1 mx-auto px-3'>
          <div className='flex justify-around'>
            <div className='hidden md:flex py-4 text-white hover:text-red-600'>LOGO</div>
            <Link className='hidden md:flex py-4 text-white hover:text-red-600' to='/'>Home</Link>
            <Link className='hidden md:flex py-4 text-white' to='collection'>Shop</Link>
            <Link className='hidden md:flex py-4 text-white' to='admin'>Admin</Link>
            <Link className='hidden md:flex py-4 text-white' to='login'>Log In</Link>
            <Link className='hidden md:flex py-4 text-white' to='signup'>Sign Up</Link>
            <Link className='py-4 text-white' to='cart'>CART {price} USD ({cartQuantity} ITEM)</Link>

            <div className='md:hidden flex items-center text-white'>
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
          <div className='mobile-menu md:hidden flex-col items-center text-white'>
            <Link className='block py-2 text-white hover:text-red-600' to='/' onClick={() => setToggleHidden(!toggleHidden)}>Home</Link>
            <Link className='block py-2 text-white' to='collection' onClick={() => setToggleHidden(!toggleHidden)}>Shop</Link>
            <Link className='block py-2 text-white' to='admin' onClick={() => setToggleHidden(!toggleHidden)}>Admin</Link>
            <Link className='block py-2 text-white' to='login'onClick={() => setToggleHidden(!toggleHidden)}>Log In</Link>
            <Link className='block py-2 text-white' to='signup'onClick={() => setToggleHidden(!toggleHidden)}>Sign Up</Link>
          </div>
          : 
          null
        }

      </nav>
    </>

  );
}

export default Nav;
