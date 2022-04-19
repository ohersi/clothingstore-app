import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
// CSS
import './cart.css';

const Cart = ({ cart, cartVisible, fetchCart, setCart, setCartVisible, setGuestCart }) => {

    const [quantity, setQuantity] = useState(1);
    const [localStorageCart, setLocalStorageCart] = useState([]);
    const [price, setPrice] = useState(0)

    const user = useContext(UserContext)

    useEffect(() => {
        fetchCart();
        setLocalStorageCart(JSON.parse(localStorage.getItem("cart")) || [])
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
                const options = {
                    method: 'DELETE',
                    url: `https://ecommerce-backnd.herokuapp.com/api/v1/deleteitem/${id}`,
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${user.user[0]?.token}`
                    }
                };
                const response = await axios.request(options);
                console.log(response.data);
                fetchCart();
            }
            catch (error) {
                console.log(error.response);
            }
        }
    }

    const updateCartQuantity = async (cart) => {

        await Promise.all(cart.map(item => {
            const editedCart = {
                quantity: item.quantity
            }
            try {
                // EDIT CART QUANTITY 
                const options = {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${user.user[0]?.token}`
                    }
                };
                console.log("this is id: ", item.id, "this is editedCart: ", editedCart)
                const response = axios.put(`https://ecommerce-backnd.herokuapp.com/api/v1/updatecart/${item.id}`, editedCart, options);
                console.log("quantity increased")
                if (response.status === 200) {
                    console.log(`item has been updated!`)
                }
            }
            catch (error) {
                console.error(error);
            }
        }))
        fetchCart();
    }

    const decrementQuantity = (i) => {
        if (localStorageCart.length > 0 && user.user.length == 0) {
            if (localStorageCart[i].quantity > 1) {
                localStorageCart[i].quantity = localStorageCart[i].quantity - 1
                // console.log(localStorageCart[i].quantity)
                setLocalStorageCart([...localStorageCart])
            }
        }
        else if (cart?.length > 0) {
            if (cart[i].quantity > 1) {
                cart[i].quantity = cart[i].quantity - 1
                setCart([...cart])
                console.log(cart)
            }

        }
        else {
            console.log("uh whats going on")
        }
    }

    const incrementQuantity = (i) => {
        if (localStorageCart.length > 0 && user.user.length == 0) {
            localStorageCart[i].quantity = localStorageCart[i].quantity + 1
            setLocalStorageCart([...localStorageCart])
        }
        else if (cart?.length > 0) {
            cart[i].quantity = cart[i].quantity + 1
            setCart([...cart])
            console.log(cart)
        }
        else {
            console.log("uh whats going on")
        }
    }

    // GUEST CART PRICE
    const guestCartTotalPrice = localStorageCart?.map(item => (
        item.products_id.price
    ));

    // USER CART PRICE
    const cartTotalPrice = cart?.map(item => (
        item.products_id.price
    ));

    // TOTAL PRICE
    let intialPrice = 0;
    setTimeout(() => {
        if (localStorageCart.length > 0 && user.user.length == 0) {
            setPrice(guestCartTotalPrice?.reduce((i, j) => i + j, intialPrice));
        }
        else {
            setPrice(cartTotalPrice?.reduce((i, j) => i + j, intialPrice));
        }
    }, 50);


    const stripeCheckout = async (item) => {

        // updateCartQuantity();

        let stripeSchema = {};
        const checkoutCart = item.map((item) => (
            stripeSchema = {
                price: item.products_id.price,
                products_id: item.products_id.id,
                products_name: item.products_id.name,
                quantity: item.quantity,
                users_id: item.user_id ? item.user_id : item.users.id
            }
        ))
        
        console.log(checkoutCart);
        console.log(item)

        const response = await axios.post(`https://catalogue-of-things-shop.netlify.app/api/v1/create-checkout-session`, checkoutCart);
        console.log(response);
        window.location.replace(`${response.data.session_url}`);
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
                                </div>
                                <div className="cart-btn-container">
                                    <div className="quantity-container">
                                        <button className='cart-btn' onClick={() => decrementQuantity(index)}>-</button>
                                        <h3>{item.quantity}</h3>
                                        <button className='cart-btn' onClick={() => incrementQuantity(index)}>+</button>
                                    </div>
                                    <button className='cart-btn' onClick={() => deleteFromCart(index)}>X</button>
                                </div>
                            </div>
                        ))
                        :
                        cart?.map((item, index) => (
                            <div className='item-card' key={item.id}>
                                <div className="cart-info">
                                    <img className='cart-img' src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                                    <h3 className='cart-name'>{item.products_id.name}</h3>
                                    <h4 className='cart-price'>${item.products_id.price}</h4>
                                </div>
                                <div className="cart-btn-container">
                                    <div className="quantity-container">
                                        <button className='cart-btn' onClick={() => decrementQuantity(index)}>-</button>
                                        <h3>{item.quantity}</h3>
                                        <button className='cart-btn' onClick={() => incrementQuantity(index)}>+</button>
                                    </div>
                                    <button className='cart-btn' onClick={() => deleteFromCart(item.id)}>X</button>
                                </div>
                            </div>
                        ))
                }
                <button onClick={() => updateCartQuantity(cart)}>Check Out</button>
                <button onClick={() => {stripeCheckout(user.user.length ? cart : localStorageCart); updateCartQuantity(cart)}}>TEST</button>
            </div>
        </div>
    );
}

export default Cart;

