import { useState, useEffect } from 'react';
import axios from 'axios';
// CSS
import './cart.css';

const Cart = ({ cart, fetchCart }) => {

    const[quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchCart();
    }, []);

    const deleteFromCart = async (id, users_id) => {

        try {
            const response = await axios.delete(`https://ecommerce-backnd.herokuapp.com/api/v1/deleteitem/${id}?userID=${users_id}`);
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
        <div>
            <div id="cart-container">
                {
                    cart.data?.map(item => (
                        <div className='item-card' key={item.id}>
                            <h3>{item.products_id.name}</h3>
                            <img className='cart-img' src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                            <h2>{item.products_id.price}</h2>
                            <h3>{item.quantity}</h3>
                            <div className="btn-container">
                                <button onClick={() => deleteFromCart(item.id, item.users_id.id)}>X</button>
                                <button onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)}>-</button>
                                <button onClick={() => setQuantity(quantity+1)}>+</button>
                                <button onClick={() => finalCheckout(item.id, quantity)}>CHECK OUT</button>
                                <h1>The QuantityCounter is: {quantity}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Cart;
