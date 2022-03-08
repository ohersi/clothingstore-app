import { useState, useEffect } from 'react';
import axios from 'axios';
// CSS
import './cart.css';

const Cart = ({ cart, cartVisible, fetchCart, setCartVisible }) => {

    const[quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchCart();
    }, []);

    const deleteFromCart = async (id) => {

        try {
            const response = await axios.delete(`https://ecommerce-backnd.herokuapp.com/api/v1/deleteitem/${id}`);
            if (response.status === 200) {
                console.log(`item has been deleted!`)
            }
            fetchCart();
        }
        catch (error) {
            console.log(error);
        }
    }

    const finalCheckout = async (id, quantity) => {

        const editedCart = {
            quantity: quantity
        }

        try {
            // EDIT CART QUANTITY 
            const response = await axios.put(`https://ecommerce-backnd.herokuapp.com/api/v1/updatecart/${id}`, editedCart);
            console.log("quantity increased")
            if (response.status === 200) {
                console.log(`item has been updated!`)
            }
            fetchCart();
        } 
        catch (error) {
            console.error(error);
        }
    }
    console.log(cart)

    return (
        <div id='cart-main'>
            <div className='cart-container'>
                <span onClick={() => setCartVisible(!cartVisible)}>X</span>
                <h1>CART</h1>
                {
                    cart?.data?.map(item => (
                        <div className='item-card' key={item.id}>
                            <img className='cart-img' src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                            <div className="cart-info">
                               <h3 className='cart-name'>{item.products_id.name}</h3>
                            <h2 className='cart-price'>${item.products_id.price}</h2> 
                            </div>
                            <h3>Quantity: {item.quantity}</h3>
                            <div className="btn-container">
                                <div className="quantity-container">
                                  <button className='cart-btn' onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)}>-</button>
                                <h3>{quantity}</h3>
                                <button className='cart-btn' onClick={() => setQuantity(quantity+1)}>+</button>  
                                </div>
                                <button className='cart-btn' onClick={() => deleteFromCart(item.id)}>X</button>
                            </div>
                                
                                <button onClick={() => finalCheckout(item.id, quantity)}>Add to Cart</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Cart;
