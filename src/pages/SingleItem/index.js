import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../../context/UserContext';
// CSS
import './singleItem.css'

const SingleItem = ({ productSelected, fetchCart, setGuestCart }) => {

    // TODO - when Add to cart button is pressed, display cart postioned(absolute) on same page
    const user = useContext(UserContext);

    const addToCart = async (id, userID) => {

        const cartItem = {
            products_id: id,
            users_id: userID,
            quantity: 1
        }

        const guestCartItem = {
            user_id: "guestUser",
            products_id: productSelected,
            quantity: 1,
            date_added: window.Date()
        }

        const addToGuestCart = () => {
            let cart = [];
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.push(guestCartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            setGuestCart(cart);
        }

        if (!user.user.length) {
            addToGuestCart()
        }
        else {
            try {
                const options = {
                    headers: {
                      Accept: 'application/json',
                      Authorization: `Bearer ${user.user[0]?.token}`
                    }
                  };
                const response = await axios.post('http://localhost:8080/api/v1/addtocart', cartItem, options);
                if (response.status === 200) {
                    console.log(`item has been added to cart!`)
                }
                fetchCart();
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="item-container">
                <div className="back-btn-container">
                    <Link to='/collection'>
                        <button id='back-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                        </button>
                    </Link>
                </div>
                <div className="img-container">
                    <img className='item-img' src={productSelected.imageURL} alt={`${productSelected.name}-product`} />
                </div>
                <div className="item-info">
                    <h1 id='item-title'>{productSelected.name} - ${productSelected.price}</h1>
                    <h1> {productSelected.description}</h1>
                    <div className="size-btn-container">
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
