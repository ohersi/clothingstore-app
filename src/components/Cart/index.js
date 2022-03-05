import { useEffect } from 'react';

const Cart = ({cart, fetchCart }) => {

    //TODO - Display itemSelected
    //TODO - Add - & + buttons
    //TODO - Remove button (clears cart completely)
    //TODO - If cart (1) disable deleteFrom Cart from - button
    //TODO - create DeleteAllFromCart api request in Java

    useEffect(() => {
        fetchCart();
    }, []);

    console.log(cart)

    return (
        <div>
            <div id="cart-container">
                {
                    cart.data?.map(item => (
                        <div className='item-card' key={item.id}>
                            <h3>{item.products_id.name}</h3>
                            <img src={item.products_id.imageURL} alt={`${item.products_id.name}-product`} />
                            <h2>{item.products_id.price}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Cart;
