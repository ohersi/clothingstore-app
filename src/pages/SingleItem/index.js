import { useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../../context/UserContext';
// CSS
import './singleItem.css'

const SingleItem = ({ productSelected, fetchCart }) => {

    // TODO - when Add to cart button is pressed, display cart postioned(absolute) on same page
    const user = useContext(UserContext)

    const addToCart = async (id, userID) => {

        const cartItem = {
            products_id: id,
            users_id: userID,
            quantity: 1
        }
        try {
            const response = await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/addtocart', cartItem);
            if (response.status === 200) {
                console.log(`item has been added to cart!`)
            }
            fetchCart();
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log(productSelected)
    return (
        <>
            <div className="item-container">
                <div className="img-container">
                    <Link to='/collection'>
                     <button id='back-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                    </button>
                    </Link>
                    <img className='item-img' src={productSelected.imageURL} alt={`${productSelected.name}-product`} />
                </div>
                <div className="item-info">
                    <h1 id='item-title'>{productSelected.name} - ${productSelected.price}</h1>
                    <h1> {productSelected.description}</h1>
                    <div className="btn-container">
                        <button className='size-btn'>S</button>
                        <button className='size-btn'>M</button>
                        <button className='size-btn'>L</button>
                        <button className='size-btn'>XL</button>
                    </div>
                    <button id='cart-btn' onClick={() => addToCart(productSelected.id, user.user.id)}>ADD TO CART</button>
                </div>


            </div>
        </>
    );
}

export default SingleItem;
