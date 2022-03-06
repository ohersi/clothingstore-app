import { Link } from 'react-router-dom'

const Nav = () => {

  //TODO - Display either Login or Sign Up component based on whether user is logged in
  
    return (
        <div>
          <Link to='/'>Home</Link>
          <Link to='collection'>Shop</Link>
          <Link to='admin'>Admin</Link>
          <Link to='signup'>Sign Up</Link>
          <Link to='login'>Log In</Link>
          <Link to='cart'>Cart</Link>
        </div>
    );
}

export default Nav;
