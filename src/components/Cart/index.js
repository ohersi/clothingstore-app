import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
// CSS
import './cart.css';

const Cart = ({ cart, cartVisible, fetchCart, setCartVisible, setGuestCart }) => {

    const [quantity, setQuantity] = useState(1);
    const localStorageCart = JSON.parse(localStorage.getItem("cart")) || "[]"

    const user = useContext(UserContext)

    useEffect(() => {
        fetchCart();
    }, []);

    const deleteFromCart = async (id) => {

        const deleteFromGuestCart = (id) => {
            let updatedCart = JSON.parse(localStorage.getItem("cart"));

            updatedCart.splice(id, 1)
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setGuestCart(updatedCart);
            console.log(id);
        }

        if (!user.user.length) {
            deleteFromGuestCart(id);
        }
        else {
            try {
                const response = await axios.delete(`https://ecommerce-backnd.herokuapp.com/api/v1/deleteitem/${id}`);
                if (response.status === 200) {
                    console.log(`item has been deleted!`)
                }
                console.log("your not suppose to be here");
                fetchCart();
            }
            catch (error) {
                console.log(error);
            }
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

    return (
        <div id='cart-main'>
            <div className='cart-container'>
                <span onClick={() => setCartVisible(!cartVisible)}>X</span>
                <h1 id='cart-title'>CART</h1>
                {
                    !user.user.length ?
                        localStorageCart?.map((item, index) => (
                            <div className='item-card'>
                                <div className="cart-info">
                                    <img className='cart-img' src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                                    <h3 className='cart-name'>{item.products_id.name}</h3>
                                    <h4 className='cart-price'>${item.products_id.price}</h4>
                                    {/* <h4>Q: {item.quantity}</h4> */}
                                </div>
                                <div className="cart-btn-container">
                                    <div className="quantity-container">
                                        <button className='cart-btn' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                                        <h3>{quantity}</h3>
                                        <button className='cart-btn' onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className='cart-btn' onClick={() => deleteFromCart(index)}>X</button>
                                    {/* <button onClick={() => finalCheckout(item.id, quantity)}>Add to Cart</button> */}
                                </div>
                            </div>
                        ))
                        :
                        cart?.data?.map(item => (
                            <div className='item-card' key={item.id}>
                                <div className="cart-info">
                                    <img className='cart-img' src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                                    <h3 className='cart-name'>{item.products_id.name}</h3>
                                    <h4 className='cart-price'>${item.products_id.price}</h4>
                                    {/* <h4>Q: {item.quantity}</h4> */}
                                </div>
                                <div className="cart-btn-container">
                                    <div className="quantity-container">
                                        <button className='cart-btn' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                                        <h3>{quantity}</h3>
                                        <button className='cart-btn' onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button className='cart-btn' onClick={() => deleteFromCart(item.id)}>X</button>
                                    <button onClick={() => finalCheckout(item.id, quantity)}>Add to Cart</button>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Cart;

