import axios from 'axios';
import { useContext} from 'react';
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
                <h1>{productSelected.name}</h1>
                <img className='item-img' src={productSelected.imageURL} alt={`${productSelected.name}-product`} />
                <h1> {productSelected.description}</h1>
                <button onClick={() => addToCart(productSelected.id, user.user.id)}>ADD TO CART</button>
            </div>
        </>
    );
}

export default SingleItem;
