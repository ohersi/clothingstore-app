import axios from 'axios';
import React from 'react';
// CSS
import './singleItem.css'

const SingleItem = ({ productSelected }) => {
    
    // TODO - when Add to cart button is pressed, display cart postioned(absolute) on same page

    const addToCart = async (id) => {
        
        const cartItem = {
            products_id: id,
            users_id: 1,
            quantity: 1
        }
        try {
            const response = await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/addtocart', cartItem);
            if (response.status === 200) {
                console.log(`item has been added to cart!`)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log(productSelected)
    return (
        <>
            <div className="item-container">
                <h1>{productSelected.name}</h1>
                <img className='item-img' src={productSelected.imageURL} alt={`${productSelected.name}-product`} />
                <h1> {productSelected.description}</h1>
                <button onClick={() => addToCart(productSelected.id)}>ADD TO CART</button>
            </div>
        </>
    );
}

export default SingleItem;
